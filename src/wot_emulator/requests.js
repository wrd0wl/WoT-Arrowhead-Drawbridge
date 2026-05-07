const axios = require('axios').default;

const config = require('./config.json');

const getAH = async () =>{
    return await axios.get(`http://${config.arrowhead.host}:${config.arrowhead.port}/serviceregistry/query/all`);
}

const postToAHS = async (body) =>{
    try{
        await axios.post(`http://${config.arrowhead.host}:${config.arrowhead.port}/serviceregistry/register`, body, {headers:{
            'Content-Type': 'application/json'}
        });
    }catch(err){
        console.error('postToAHS failed:', err.message);
    }
}

const checkUrlDevice = async (deviceData) =>{
    try{
        return await axios.get(`http://${config.wot.host}:${config.wot.port}${deviceData.serviceUri}`);
    }catch(err){
        console.error('checkUrlDevice failed:', err.message);
    }
}

const postWoTvalue = async(deviceData, wotvalue) =>{
    try{
        await axios.post(`http://${config.wot.host}:${config.wot.port}${deviceData.serviceUri}/actions/ChangeValue`, {value: wotvalue}, {headers: {
            'Content-Type': 'application/json'}
        });
    }catch(err){
        console.error('postWoTvalue failed:', err.message);
    }

}

const notifyDevice = async() =>{
    try{
        await axios.post(`http://${config.push.host}:${config.push.port}/wotnotif`, {}, {headers:{
            'Content-Type': 'application/json'}
        });
    }catch(err){
        console.error('notifyDevice failed:', err.message);
    }

}

module.exports = {
    getAH,
    postToAHS,
    checkUrlDevice,
    postWoTvalue,
    notifyDevice
}