const parseId = (data) =>{
    return data.replace(/\./g, "");
}

const parseTitle = (data) => {
    return data.replace(/\./g, "-");
}

const getDeviceType = (data) =>{
    const device = data.split(".");
    return device[3];
}

const getValueType = (data) =>{
    if(typeof data == "number"){
         return "integer";
    }
    else if(typeof data == "boolean"){
        return "boolean";
    }
    else if(typeof data == "string"){
        return "string";
    }
}

const getProperty = (data) =>{
    if(getDeviceType(data) == 'accl'){
        return 'Value';
    }
    else if(getDeviceType(data) == 'plug'){
        return 'PoweredOn';
    }
}

const getActionsDescription = (data) =>{
    let action = {};
    if(getDeviceType(data) == "plug"){
        action = {
            "PowerOff":{
                type: "boolean",
                description: "Power off the plug"
            }
        }
    }
    return action;
}

const matchDevice = (descriptorData, deviceData) =>{
    let matched = true;
    let matchedDevices = [];
    const descriptor = descriptorData.split('.');
    for(let i = 0; i < deviceData.length; i++){
        for(let j = 0; j < descriptor.length; j++){
            if(descriptor[j] != "*" && !deviceData[i].includes(descriptor[j])){
                matched = false;
            }
        }
        if(matched){
            matchedDevices.push(deviceData[i]);
        }
        matched = true;
    }
    return matchedDevices;
}


module.exports = {
    parseId,
    parseTitle,
    getDeviceType,
    getValueType,
    getProperty,
    getActionsDescription,
    matchDevice
}