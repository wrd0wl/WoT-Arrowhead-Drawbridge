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

module.exports = {
    getAH,
    postToAHS
}