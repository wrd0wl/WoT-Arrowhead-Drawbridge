const path = require('path');
const fs = require('fs');
const util = require('./utils.js');
const requests = require('./requests.js');
const directoryPath = path.join(__dirname, 'descriptors');

let devices = [];

let conditionsDescriptor;
let effectsDescriptor;


const rulesControl = async() =>{
    if(devices.length == 0){
        await getDevices();
    }
    else{
        const descriptors = readFiles(directoryPath);
        for(let i = 0; i < descriptors.length; i++){
            conditionsDescriptor = descriptors[i].triggers[0].conditions;
            effectsDescriptor = descriptors[i].triggers[0].effects;
            let checkedProperty = false;
            if('AND' in conditionsDescriptor){
                checkedProperty = true;
                for(let j = 0; j < conditionsDescriptor.AND.length; j++){
                    if(!await checkProperties(conditionsDescriptor.AND[j])){
                        checkedProperty = false;
                    }
                }
            }
            else if('OR' in conditionsDescriptor){
                for(let j = 0; j < conditionsDescriptor.OR.length; j++){
                    if(await checkProperties(conditionsDescriptor.OR[j])){
                        checkedProperty = true;
                    }
                }
            }
            else{
                checkedProperty = await checkProperties(conditionsDescriptor);
            }
            console.log(checkedProperty);
            if(checkedProperty){
                await effects();
            }
        }
    }
}

const checkProperties = async(condition) =>{
    let checkedSelector = true;
    for(let i = 0; i < devices.length; i++){
        if(util.checkSelector(devices[i], condition)){
            let deviceProperty = await requests.getPropertyValue(devices[i], condition);
            if(!util.checkProperty(deviceProperty, condition)){
                checkedSelector = false;
            }
        }
    }
    return checkedSelector;
}

const effects = async() =>{
    for(let i = 0; i < devices.length; i++){
        for(let j = 0; j < effectsDescriptor.length; j++){
            if(util.checkSelector(devices[i], effectsDescriptor[j])){
                await requests.postEffects(devices[i], effectsDescriptor[j]);
            }
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
    let check = await requests.checkUrlDevice(data);
    if(check && util.checkMetadata(data)){
        devices.push(data);
    }
}


module.exports = {
    rulesControl
}