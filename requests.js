const axios = require('axios').default;

const getRequest = async (device, property) =>{
    return await axios.get('http://localhost:8080/' + device + '/properties/' + property);
}

const postRequest = async (device, action) =>{
    await axios.post('http://localhost:8080/' + device + '/actions/' + action, {}, {headers:{
        'Content-Type': 'application/json'}
    });
}

module.exports = {
    getRequest,
    postRequest
}