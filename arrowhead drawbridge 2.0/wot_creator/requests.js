const axios = require('axios').default;

const baseUrl = 'http://137.204.57.93:8443/'

const postToAHS = async (body) =>{
    await axios.post(baseUrl + 'serviceregistry/register', body, {headers:{
        'Content-Type': 'application/json'}
    });
}

module.exports = postToAHS;