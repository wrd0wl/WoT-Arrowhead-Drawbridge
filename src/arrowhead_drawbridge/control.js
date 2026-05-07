const path = require('path');
const fs = require('fs');
const util = require('./utils.js');
const requests = require('./requests.js');
const directoryPath = path.join(__dirname, 'descriptors');

let devices = [];

const rulesControl = async() =>{
    
    await getDevices();

    const descriptors = readFiles(directoryPath);
    for(let i = 0; i < descriptors.length; i++){
        const conditionsDescriptor = descriptors[i].triggers[0].conditions;
        const effectsDescriptor = descriptors[i].triggers[0].effects;
        let checkedProperty = false;
        if('AND' in conditionsDescriptor){
            if(conditionsDescriptor.AND.length === 0){
                checkedProperty = false;
            } else {
                checkedProperty = true;
                for(let j = 0; j < conditionsDescriptor.AND.length; j++){
                    if(!await checkProperties(conditionsDescriptor.AND[j])){
                        checkedProperty = false;
                    }
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

        if(checkedProperty){
            await effects(effectsDescriptor);
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

const effects = async(effectsDescriptor) =>{
    for(let i = 0; i < devices.length; i++){
        for(let j = 0; j < effectsDescriptor.length; j++){
            if(util.checkSelector(devices[i], effectsDescriptor[j])){
                await requests.postEffects(devices[i], effectsDescriptor[j]);
            }
        }
    }
}

const readFiles = (dir) => {

    if(!fs.existsSync(dir)){
        console.error('Descriptors folder not found:', dir);
        return [];
    }

    var files = [];
    fs.readdirSync(dir)
        .forEach((name, index) => {
            if (fs.statSync(path.join(dir, name)).isDirectory()) return;
            try {
                files[index] = JSON.parse(fs.readFileSync(path.join(dir, name), 'utf8'));
            } catch(err) {
                console.error(`Failed to parse descriptor file ${name}:`, err.message);
            }
        });
    return files;
}

const getDevices = async() =>{
    const res = await requests.getAH();
    devices = await findWot(res.data.data);
}

const findWot = async(data) =>{
    let wotdevices = [];
    for(let i = 0; i < data.length; i++){
        if(util.checkMetadata(data[i])){
            let device = await requests.checkUrlDevice(data[i]);
            if(device != undefined){
                wotdevices.push(data[i]);
            }
        }
    }
    return wotdevices;
}


module.exports = {
    rulesControl
}