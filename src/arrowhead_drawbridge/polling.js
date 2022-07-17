const config = require('./config.json');

const control = require('./control.js');

const polling = async () =>{
    setInterval(() => control.pollingControl(), config.pollingInterval);
}

module.exports = polling;