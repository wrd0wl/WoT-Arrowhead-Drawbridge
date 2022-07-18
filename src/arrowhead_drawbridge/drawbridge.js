const path = require('path');
const fs = require('fs');
const util = require('./utils.js');
const requests = require('./requests.js');
const directoryPath = path.join(__dirname, 'descriptors');

let devices = [];

let conditionsDescriptor;
let effectsDescriptor;

const pollingControl = async() =>{
    if(devices.length == 0){
        await getDevices();
    }
    const descriptors = readFiles(directoryPath);
    for(let i = 0; i < descriptors.length; i++){
        conditionsDescriptor = descriptors[i].triggers[0].conditions;
        effectsDescriptor = descriptors[i].triggers[0].effects;
        let checkedProperty;
        if(conditionsDescriptor.hasOwnProperty('AND')){  
            checkedProperty = true;
            for(let i = 0; i < devices.length; i++){
                checkedProperty = await controlAND(devices[i], checkedProperty);
            }
        }
        else if(conditionsDescriptor.hasOwnProperty('OR')){
            for(let i = 0; i < devices.length; i++){
                checkedProperty = await controlOR(devices[i], checkedProperty);
            }
        }
        if(checkedProperty){
            await effects();
        }
    }
}


const pushControl = async(device) =>{
    if(devices.length == 0){
        await getDevices();
    }
    const descriptors = readFiles(directoryPath);
    for(let i = 0; i < descriptors.length; i++){
        conditionsDescriptor = descriptors[i].triggers[0].conditions;
        effectsDescriptor = descriptors[i].triggers[0].effects;  
        let checkedProperty;
        if(conditionsDescriptor.hasOwnProperty('AND')){
            checkedProperty = true;
            checkedProperty = await controlAND(device, checkedProperty);
        }
        else if(conditionsDescriptor.hasOwnProperty('OR')){
            checkedProperty = await controlOR(device, checkedProperty);
        }
        if(checkedProperty){
            await effects();
        }
    }
}

const controlAND = async (device, checked) =>{
    const descriptor = util.checkSelector(device, conditionsDescriptor.AND);
        if(descriptor != undefined){
            const propertyValue = await requests.getPropertyValue(device, descriptor);
            if(!util.checkProperty(propertyValue, descriptor)){
                checked = false;
            }
        }
        return checked;
}

const controlOR = async (device, checked) =>{
    const descriptor = util.checkSelector(device, conditionsDescriptor.OR);
        if(descriptor != undefined){
            const propertyValue = await requests.getPropertyValue(device, descriptor);
            if(util.checkProperty(propertyValue, descriptor)){
                checked = true;
            }
        }
    return checked;
}

const effects = async() =>{
    for(let i = 0; i < devices.length; i++){
        const action = util.checkSelector(devices[i], effectsDescriptor);
        if(action != undefined){
            await requests.postEffects(devices[i], action);
        }
    }
}

const readFiles = (dir) => {
    var files = [];
    fs.readdirSync(dir)
        .forEach((name, index) => {
            if (fs.statSync(path.join(dir, name)).isDirectory()) return;

            files[index] = JSON.parse(fs.readFileSync(path.join(dir, name), 'utf8'));
        });
    return files;
}

const getDevices = async() =>{
    const res = await requests.getAH();
    await res.data.data.forEach(findWot);
}

const findWot = async(data) =>{
    if(util.checkMetadata(data)){
        devices.push(data);
    }
}


module.exports = {
    pollingControl,
    pushControl
}