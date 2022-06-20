const axios = require('axios').default;

const baseUrl = 'http://137.204.57.93:8443/'

const getAH = async () =>{
    return await axios.get(baseUrl + 'serviceregistry/query/all');
}

module.exports = {
    getAH
};