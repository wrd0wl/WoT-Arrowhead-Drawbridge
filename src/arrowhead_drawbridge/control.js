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
            if(conditionsDescriptor.hasOwnProperty('AND')){  
                checkedProperty = true;
                for(let i = 0; i < conditionsDescriptor.AND.length; i++){
                    if(!await util.checkCondition(devices, conditionsDescriptor.AND[i])){
                        checkedProperty = false;
                    }
                }
            }
            else if(conditionsDescriptor.hasOwnProperty('OR')){
                for(let i = 0; i < conditionsDescriptor.OR.length; i++){
                    if(await util.checkCondition(devices, conditionsDescriptor.OR[i])){
                        checkedProperty = true;
                    }
                }
            }
            else{
                checkedProperty = await util.checkCondition(devices, conditionsDescriptor);
            }
            if(checkedProperty){
                await effects();
            }
        }
    }
}

const effects = async() =>{
    for(let i = 0; i < devices.length; i++){
        for(let j = 0; j < effectsDescriptor.length; j++){
            if(util.checkEffect(devices[i], effectsDescriptor[j])){
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