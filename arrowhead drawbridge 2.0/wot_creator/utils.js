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
            "HardPowerOff":{
                type: "boolean",
                description: "Power off the plug"
            },
            "SoftPowerOff":{
                type: "boolean",
                description: "Power off the plug"
            },
        }
    }
    return action;
}

module.exports = {
    parseId,
    parseTitle,
    getDeviceType,
    getValueType,
    getProperty,
    getActionsDescription
}