const axios = require('axios').default;

const conf = require('../config.json');

const getAH = async () =>{
    return await axios.get(`http://${conf.arrowhead.host}:${conf.arrowhead.port}/serviceregistry/query/all`);
}

const postToAHS = async (body) =>{
    await axios.post(`http://${conf.arrowhead.host}:${conf.arrowhead.port}/serviceregistry/register`, body, {headers:{
        'Content-Type': 'application/json'}
    });
}

module.exports = {
    getAH,
    postToAHS
}