const config = require('./config.json');

const drawbridge = require('./drawbridge.js');

const polling = async () =>{
    setInterval(() => drawbridge.pollingControl(), config.pollingInterval);
}

module.exports = polling;