let jsonDescriptor = require('./descriptor.json');
let conditionsDescriptor = jsonDescriptor.triggers[0].conditions;
let effectsDescriptor = jsonDescriptor.triggers[0].effects;

let util = require('./utils.js');

let requests = require('./requests.js');

let devices = [];

const pollingControl = async() =>{
    if(devices.length == 0){
        await getDevices();
    }

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


const pushControl = async(device) =>{
    if(devices.length == 0){
        await getDevices();
    }
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

/*const interactionControl = async () =>{
    let checkedProperty;
    if(conditionsDescriptor.hasOwnProperty('AND')){
        checkedProperty = true;
        for(let i = 0; i < devices.length; i++){
            const descriptor = util.checkSelector(devices[i], conditionsDescriptor.AND);
            if(descriptor != undefined){
                console.log(descriptor);
                const propertyValue = await requests.getPropertyValue(devices[i], descriptor);
                if(!util.checkProperty(propertyValue, descriptor)){
                    checkedProperty = false;
                }
            }
        }
    }
    else if(conditionsDescriptor.hasOwnProperty('OR')){
        for(let i = 0; i < devices.length; i++){
            const descriptor = util.checkSelector(devices[i], conditionsDescriptor.OR);
            if(descriptor != undefined){
                const propertyValue = await requests.getPropertyValue(devices[i], descriptor);
                if(util.checkProperty(propertyValue.data, descriptor)){
                    checkedProperty = true;
                }
            }
        }
    }
    if(checkedProperty){
        for(let i = 0; i < devices.length; i++){
            const action = util.checkSelector(devices[i], effectsDescriptor);
            if(action != undefined){
                await requests.postEffects(devices[i], action);
            }
        }
    }
}*/

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