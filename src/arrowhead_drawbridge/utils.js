const requests = require('./requests.js');

const checkMetadata = (data) =>{
    if(data.metadata == undefined){
        return false;
    }

    if(data.hasOwnProperty('additionalProp1')){
        return false;
    }

    if(data.metadata.additionalProp1 == undefined){
        return false;
    }

    if(!checkIfWot(data.metadata.additionalProp1)){
        return false;
    }
    return true;
}

const checkIfWot = (data) =>{
    return data && data.includes('building') || data.includes('floor') || data.includes('room') ? true : false;
}


const checkCondition = async (devices, condition) =>{
    let checked = false;
    for(let i = 0; i < devices.length; i++){
        let regexpr;
        if(condition.selector.charAt(0) == '*'){
            regexpr = new RegExp(condition.selector.slice(2));
        }
        else{
            regexpr = new RegExp(condition.selector);
        }
        if(regexpr.test(devices[i].metadata.additionalProp1)){
            checked = true;
            let deviceData = await requests.getPropertyValue(devices[i], condition);
            if(!checkProperty(deviceData, condition)){
                checked = false;
            }
        }
    }
    return checked;
}

const checkProperty = (deviceData, condition) => {
    let checked = false;
    if(condition.operator == 'gte' && deviceData.data >= condition.value){
        checked = true;
    }
    else if(condition.operator == 'gt' && deviceData.data > condition.value){
        checked = true;
    }
    else if(condition.operator == 'lte' && deviceData.data <= condition.value){
        checked = true;
    }
    else if(condition.operator == 'lt' && deviceData.data < condition.value){
        checked = true;
    }
    else if(condition.operator == 'eq' && deviceData.data == condition.value){
        checked = true;
    }
    return checked;
}

const checkEffect = (device, effects) =>{
    let checked = false;
    let regexpr;
    if(effects.selector.charAt(0) == '*'){
        regexpr = new RegExp(effects.selector.slice(2));
    }
    else{
        regexpr = new RegExp(effects.selector);
    }
    if(regexpr.test(device.metadata.additionalProp1)){
        checked = true;
    }
    return checked;
}



module.exports = {
    checkMetadata,
    checkCondition,
    checkProperty,
    checkEffect
}