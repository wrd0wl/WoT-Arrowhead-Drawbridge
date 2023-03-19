const server = require('./server');
const factory = require('./factory/tdFactory.js');
const util = require('./utils');

let integers = ['accl', 'temp'];
let booleans = ['plug', 'heat'];

const createWot = async (data, index) =>{
    const td = factory(data, index);
    let setData = data.value;
    if (typeof server.getServer() === 'undefined'){
        server.startServer();
    }

    let serverInit = await server.getServer();
    let thing = await serverInit.produce(td);
    await thing.writeProperty(util.getProperty(data.selector), data.value);
    await thing.setPropertyReadHandler(util.getProperty(data.selector), async () => setData);

    if(integers.includes(util.getDeviceType(data.selector))){
        await thing.setActionHandler("ChangeValue", async(params) =>{
            setData = params;
            return undefined;
        });
    }

    if(booleans.includes(util.getDeviceType(data.selector))){
        await thing.setActionHandler("PowerOff", async() =>{
            setData = false;
            return undefined;
        });
        await thing.setActionHandler("PowerOn", async() =>{
            setData = true;
            return undefined;
        });
    }
    await thing.expose();
}

module.exports = createWot;