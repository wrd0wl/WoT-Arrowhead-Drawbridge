const config = require('./config.json');
const logic_control = require('./control.js');

const pull = async () => {
    console.log(`[pull] Pull mode started. Interval: ${config.pullInterval}ms`);
    // Run immediately on start
    await logic_control.rulesControl();
    // Then repeat every pullInterval
    setInterval(() => logic_control.rulesControl(), config.pullInterval);
}

module.exports = pull;