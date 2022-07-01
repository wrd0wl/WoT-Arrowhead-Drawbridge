const config = require('../config.json');

const control = require('./control.js');

const polling = async (data) =>{
    await setInterval(() => control(data), config.pollingInterval);
}

module.exports = polling;