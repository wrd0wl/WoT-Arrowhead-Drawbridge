const axios = require('axios').default;
const config = require('./config.json');

const getAH = async () => {
    console.log('[requests] GET Arrowhead service registry...');
    return await axios.get(`http://${config.arrowhead.host}:${config.arrowhead.port}/serviceregistry/query/all`);
}

const checkUrlDevice = async (deviceData) => {
    try {
        return await axios.get(`http://${config.wot.host}:${config.wot.port}${deviceData.serviceUri}`);
    } catch (err) {
        console.error(`[requests] checkUrlDevice failed for ${deviceData.serviceUri}:`, err.message);
    }
}

const getPropertyValue = async (deviceData, descriptor) => {
    try {
        return await axios.get(`http://${config.wot.host}:${config.wot.port}${deviceData.serviceUri}/properties/${descriptor.property}`);
    } catch (err) {
        console.error(`[requests] getPropertyValue failed for ${deviceData.serviceUri}:`, err.message);
    }
}

const postEffects = async (deviceData, action) => {
    try {
        await axios.post(
            `http://${config.wot.host}:${config.wot.port}${deviceData.serviceUri}/actions/${action.affordanceName}`,
            action.affordancePayload || {},
            { headers: { 'Content-Type': 'application/json' } }
        );
        console.log(`[requests] postEffects success: ${action.affordanceName} → ${deviceData.serviceUri}`);
    } catch (err) {
        console.error(`[requests] postEffects failed for ${deviceData.serviceUri}:`, err.message);
    }
}

module.exports = {
    getAH,
    checkUrlDevice,
    getPropertyValue,
    postEffects
};