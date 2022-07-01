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

const checkIfWotExists = (serverData, wotData) =>{
    let flag;
    for(let i = 0; i < serverData.length; i++){
        if(checkMetadata(serverData[i]) && serverData[i].metadata.additionalProp1.includes(wotData.selector)){
            flag = true;
        }
    }
    return flag;
}

module.exports = {
    parseId,
    parseTitle,
    getDeviceType,
    getValueType,
    getProperty,
    getActionsDescription,
    checkMetadata,
    checkIfWot,
    checkIfWotExists
}