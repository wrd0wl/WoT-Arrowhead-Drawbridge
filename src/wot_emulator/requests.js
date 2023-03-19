const axios = require('axios').default;

const config = require('./config.json');

const getAH = async () =>{
    return await axios.get(`http://${config.arrowhead.host}:${config.arrowhead.port}/serviceregistry/query/all`);
}

const postToAHS = async (body) =>{
    await axios.post(`http://${config.arrowhead.host}:${config.arrowhead.port}/serviceregistry/register`, body, {headers:{
        'Content-Type': 'application/json'}
    });
}

const checkUrlDevice = async (deviceData) =>{
    try{
        return await axios.get(`http://${config.wot.host}:${config.wot.port}${deviceData.serviceUri}`);
    }catch(err){
    }
}

const postWoTvalue = async(deviceData, wotvalue) =>{
    await axios.post(`http://${config.wot.host}:${config.wot.port}${deviceData.serviceUri}/actions/ChangeValue`, {value: wotvalue}, {headers: {
        'Content-Type': 'application/json'}
    });
}

const notifyDevice = async() =>{
    await axios.post(`http://${config.push.host}:${config.push.port}/wotnotif`, {}, {headers:{
        'Content-Type': 'application/json'}
    });
}

module.exports = {
    getAH,
    postToAHS,
    checkUrlDevice,
    postWoTvalue,
    notifyDevice
}