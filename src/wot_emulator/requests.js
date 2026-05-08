const axios = require('axios').default;
const config = require('./config.json');

const getAH = async () => {
    console.log('[requests] GET Arrowhead service registry...');
    return await axios.get(`http://${config.arrowhead.host}:${config.arrowhead.port}/serviceregistry/query/all`);
}

const postToAHS = async (body) => {
    try {
        console.log(`[requests] POST register service: ${body.serviceUri}`);
        await axios.post(
            `http://${config.arrowhead.host}:${config.arrowhead.port}/serviceregistry/register`,
            body,
            { headers: { 'Content-Type': 'application/json' } }
        );
        console.log(`[requests] Service registered: ${body.serviceUri}`);
    } catch (err) {
        console.error(`[requests] postToAHS failed for ${body.serviceUri}:`, err.message);
    }
}

const checkUrlDevice = async (deviceData) => {
    try {
        return await axios.get(`http://${config.wot.host}:${config.wot.port}${deviceData.serviceUri}`);
    } catch (err) {
        console.error(`[requests] checkUrlDevice failed for ${deviceData.serviceUri}:`, err.message);
    }
}

const postWoTvalue = async (deviceData, wotvalue) => {
    try {
        console.log(`[requests] POST ChangeValue on ${deviceData.serviceUri}: ${wotvalue}`);
        await axios.post(
            `http://${config.wot.host}:${config.wot.port}${deviceData.serviceUri}/actions/ChangeValue`,
            { value: wotvalue },
            { headers: { 'Content-Type': 'application/json' } }
        );
    } catch (err) {
        console.error(`[requests] postWoTvalue failed for ${deviceData.serviceUri}:`, err.message);
    }
}

const notifyDevice = async () => {
    try {
        console.log('[requests] POST /wotnotif to drawbridge...');
        await axios.post(
            `http://${config.push.host}:${config.push.port}/wotnotif`,
            {},
            { headers: { 'Content-Type': 'application/json' } }
        );
        console.log('[requests] Drawbridge notified');
    } catch (err) {
        console.error('[requests] notifyDevice failed:', err.message);
    }
}

module.exports = {
    getAH,
    postToAHS,
    checkUrlDevice,
    postWoTvalue,
    notifyDevice
}