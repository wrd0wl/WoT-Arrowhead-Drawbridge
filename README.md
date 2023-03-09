# WoT-Arrowhead-Drawbridge
This an Arrowhead Drawbridge project, that is a part of the Thesis **WOT ARROWHEAD DRAWBRIDGE: BRIDGING HETEROGENIC IOT-BASED SYSTEMS**.
It consists of **wot_emulator** and **arrowhead_drawbridge** which both run on **Node.js**.
## WoT Emulator
This program emulates different IoT devices creating Web Things by [Eclipse Thingweb node-wot](https://github.com/eclipse/thingweb.node-wot) and [Eclipse Arrowhead](https://github.com/eclipse-arrowhead/core-java-spring) frameworks.  

How to run the program in the terminal by following CLI commands:
- type the path to the directory where is **wot_emulator**: `cd home/yourusername/path/to/src/wot_emulator`
- enter `npm install` to install `package.json`
- run `npm run start`

## Arrowhead Drawbridge
This program implements the rule-based engine that is able to connect several IoT devices.  

How to run the program in the terminal by following CLI commands:
- type the path to the directory where is **arrowhead_drawbridge**: `cd home/yourusername/path/to/src/arrowhead_drawbridge`
- select the pull or push mode by setting **_true_** or **_false_** in the file `config.json`
- enter `npm install` to install `package.json`
- run `npm run start`  

The rules are in the `descriptors` directory.
