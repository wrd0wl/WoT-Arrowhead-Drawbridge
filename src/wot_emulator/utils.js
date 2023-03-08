let integers = ['accl', 'temp'];
let booleans = ['plug', 'heat'];

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
    if(integers.includes(getDeviceType(data))){
        return 'Value';
    }

    if(booleans.includes(getDeviceType(data))){
        return 'PoweredOn';
    }
}


const getActionsDescription = (data) =>{
    let action = {};
    if(integers.includes(getDeviceType(data))){
        action = {
            "ChangeValue":{
                type: 'integer'
            }
        }
    }
    
    if(booleans.includes(getDeviceType(data))){
        action = {
            "PowerOff":{
                type: "boolean",
                description: "Power off the device"
            },
            "PowerOn":{
                type: "boolean",
                description: "Power on the device"
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
    getDeviceType,
    getValueType,
    getProperty,
    getActionsDescription,
    checkMetadata,
    checkIfWot,
    checkIfWotExists
}