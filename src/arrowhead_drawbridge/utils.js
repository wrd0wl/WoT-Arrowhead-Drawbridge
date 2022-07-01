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
        let checked = true;
        const descriptorArray = descriptor[i].selector.split('.');
        for(let j = 0; j < descriptorArray.length; j++){
            if(descriptorArray[j] != '*' && !deviceData.metadata.additionalProp1.includes(descriptorArray[j])){
                checked = false;
            }
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