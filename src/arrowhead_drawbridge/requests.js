const axios = require('axios').default;

const config = require('./config.json');

const getAH = async () =>{
    return await axios.get(`http://${config.arrowhead.host}:${config.arrowhead.port}/serviceregistry/query/all`);
}

const checkUrlDevice = async (deviceData) =>{
    try{
        return await axios.get(`http://${config.wot.host}:${config.wot.port}${deviceData.serviceUri}`);
    }catch(err){
        console.error('checkUrlDevice failed:', err.message);
    }
}

const getPropertyValue = async (deviceData, descriptor) =>{
        try{
        return await axios.get(`http://${config.wot.host}:${config.wot.port}${deviceData.serviceUri}/properties/${descriptor.property}`);
    }catch(err){
        console.error('getPropertyValue failed:', err.message);
    }
}

const postEffects = async (deviceData, action) =>{
        try{
        await axios.post(
            `http://${config.wot.host}:${config.wot.port}${deviceData.serviceUri}/actions/${action.affordanceName}`, action.affordancePayload || {},
            { headers: { 'Content-Type': 'application/json' } }
        );
    }catch(err){
        console.error('postEffects failed:', err.message);
    }
}
module.exports = {
    getAH,
    checkUrlDevice,
    getPropertyValue,
    postEffects
};