# WoT-Arrowhead-Drawbridge
This is an Arrowhead Drawbridge project, that is a part of the Thesis **WOT ARROWHEAD DRAWBRIDGE: BRIDGING HETEROGENIC IOT-BASED SYSTEMS**.
It consists of **wot_emulator** and **arrowhead_drawbridge** which both run on **Node.js**.
## WoT Emulator
This program emulates different IoT devices creating Web Things by [Eclipse Thingweb node-wot](https://github.com/eclipse/thingweb.node-wot) framework and register them as a service on [Eclipse Arrowhead](https://github.com/eclipse-arrowhead/core-java-spring) framework.  

How to run the program in the terminal by following CLI commands:
- type the path to the directory where is **wot_emulator**: `cd home/yourusername/path/to/src/wot_emulator`
- enter `npm install` to install `package.json`
- run `npm run start`

The devices with their locations and values can be defined in `devices.json` file.

## Arrowhead Drawbridge
This program implements a rule-based engine that can connect IoT-based systems.  

How to run the program in the terminal by following CLI commands:
- type the path to the directory where is **arrowhead_drawbridge**: `cd home/yourusername/path/to/src/arrowhead_drawbridge`
- select the _pull_ or _push_ mode by setting **_true_** or **_false_** and define **_pullInterval_** in milliseconds in the file `config.json`
- enter `npm install` to install `package.json`
- run `npm run start`  

The rules are in the `descriptors` directory.

## Emulating the processes
How to test the processes:
- set **_true_** in **_test_** and define **_interval_** in milliseconds in the file `config.json` that is located in the `wot_emulator` directory.
- if there is selected _pull_ mode, first run **wot_emulator** and then **arrowhead_drawbridge**.
- _pull_ mode requires setting **_true_** in file `config.json` that is located in the `wot_emulator` directory. First execute **arrowhead_drawbridge** and then **wot_emulator**.