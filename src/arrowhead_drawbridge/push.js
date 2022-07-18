const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const config = require('./config.json');

const drawbridge = require('./drawbridge.js');

app.use(bodyParser.json());

app.post('/wotinfo', (req, res) => {
    drawbridge.pushControl(req.body.data);
    res.send();
});

module.exports = () =>{
    app.listen(config.push.port, () =>console.log(`Listening on port: http://${config.push.host}:${config.push.port}...`));
}