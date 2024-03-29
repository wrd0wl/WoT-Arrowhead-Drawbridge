const axios = require('axios').default;

const config = require('./config.json');

const getAH = async () =>{
    return await axios.get(`http://${config.arrowhead.host}:${config.arrowhead.port}/serviceregistry/query/all`);
}

const checkUrlDevice = async (deviceData) =>{
    try{
        return await axios.get(`http://${config.wot.host}:${config.wot.port}${deviceData.serviceUri}`);
    }catch(err){
    }
}

const getPropertyValue = async (deviceData, descriptor) =>{
    return await axios.get(`http://${config.wot.host}:${config.wot.port}${deviceData.serviceUri}/properties/${descriptor.property}`);
}

const postEffects = async (deviceData, action) =>{
    await axios.post(`http://${config.wot.host}:${config.wot.port}${deviceData.serviceUri}/actions/${action.affordanceName}`, {},  {headers:{
        'Content-Type': 'application/json'}});
}
module.exports = {
    getAH,
    checkUrlDevice,
    getPropertyValue,
    postEffects
};