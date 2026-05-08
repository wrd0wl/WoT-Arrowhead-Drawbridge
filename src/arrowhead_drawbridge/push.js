const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config.json');
const control = require('./control.js');

app.use(bodyParser.json());

app.post('/wotnotif', async (req, res) => {
    console.log('[push] Received notification on /wotnotif');
    try {
        await control.rulesControl();
        res.send();
    } catch (err) {
        console.error('[push] Error during rulesControl:', err.message);
        res.status(500).send();
    }
});

module.exports = async () => {
    await app.listen(config.push.port, () =>
        console.log(`[push] Listening on http://${config.push.host}:${config.push.port}`)
    );
}