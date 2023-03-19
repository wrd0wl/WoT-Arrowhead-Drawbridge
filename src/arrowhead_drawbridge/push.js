const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const config = require('./config.json');

const control = require('./control.js');

app.use(bodyParser.json());

app.post('/wotnotif', (req, res) => {
    control.rulesControl();
    res.send();
});

module.exports = () =>{
    app.listen(config.push.port, () =>console.log(`Listening on port: http://${config.push.host}:${config.push.port}...`));
}