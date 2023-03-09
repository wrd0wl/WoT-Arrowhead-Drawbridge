const config = require('./config.json');

const logic_control = require('./control.js');

const pull = async () =>{
    setInterval(() => logic_control.rulesControl(), config.pullInterval);
}

module.exports = pull;