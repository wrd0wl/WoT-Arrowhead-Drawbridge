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


const checkSelector = (deviceData, descriptor) =>{
    for(let i = 0; i < descriptor.length; i++){
        let checked = false;
        let regexSelector;
        if(descriptor[i].selector.charAt(0) == '*'){
            regexSelector = new RegExp(descriptor[i].selector.slice(2));
        }
        else{
            regexSelector = new RegExp(descriptor[i].selector);
        }
        if(regexSelector.test(deviceData.metadata.additionalProp1)){
            checked = true;
        }
        
        if(checked){
            return descriptor[i];
        }
    }
    return undefined;
}

const checkProperty = (deviceData, descriptor) => {
    let checked = false
    if(descriptor.operator == 'gte' && deviceData >= descriptor.value){
        checked = true;
    }
    else if(descriptor.operator == 'gt' && deviceData > descriptor.value){
        checked = true;
    }
    else if(descriptor.operator == 'lte' && deviceData <= descriptor.value){
        checked = true;
    }
    else if(descriptor.operator == 'lt' && deviceData < descriptor.value){
        checked = true;
    }
    else if(descriptor.operator == 'eq' && deviceData == descriptor.value){
        checked = true;
    }
    return checked;
}

module.exports = {
    checkMetadata,
    checkSelector,
    checkProperty
}