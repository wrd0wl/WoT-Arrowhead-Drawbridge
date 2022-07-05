const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const config = require('../config.json');

const control = require('./control.js');

let data;

app.use(bodyParser.json());

app.post('/wotinfo', function (req, res) {
    data = req.body.data;
    console.log(data);
    res.send();
});

module.exports = () =>{
    app.listen(config.api.port, () =>console.log(`Listening on port: http://${config.api.host}:${config.api.port}...`));
}