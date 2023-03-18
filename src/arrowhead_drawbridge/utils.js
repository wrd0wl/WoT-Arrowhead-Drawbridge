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


const checkSelector = (devices, descriptor) =>{
    let checked = false;
    let regexpr;
    if(descriptor.selector.charAt(0) == '*'){
        regexpr = new RegExp(descriptor.selector.slice(2));
    }
    else{
        regexpr = new RegExp(descriptor.selector);
    }
    if(regexpr.test(devices.metadata.additionalProp1)){
        checked = true;
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



module.exports = {
    checkMetadata,
    checkSelector,
    checkProperty,
}