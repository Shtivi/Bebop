var bebop = require('node-bebop');
var Promise = require('promise');

// Data members
var drone = null;
var connected = false;
var eventListeners = {
    stats: [],
    actions: []
}
var socketsCtrl = null;
var currentStats = {};

// Initializer
module.exports = (debugMode, socketsController) => {
    socketsCtrl = socketsController;
    
    if (!debugMode) {
        drone = bebop.createClient();
        console.log("Attempting to connect to the drone...");

        drone.connect(() => {
            console.log("Drone connected");
            connected = true;

            drone.WifiSettings.outdoorSetting(0);

            // drone.takeOff(() => {
            //     console.log("taken off");
            //     drone.up(20);
            //     setTimeout(() => drone.stop(), 2000);
            //     drone.land(() => console.log("landed"));
            // })

            //drone.takeOff();
            // setTimeout(() => drone.up(50), 3000);
            // setTimeout(function() {
            //     drone.stop();
            // }, 3000 + 1500);
            // setTimeout(function() {
            //     drone.down(80);
            // }, 3000 + 1500 + 2000);
            // setTimeout(function() {
            //     drone.land();
            // }, 3000 + 1500 + 2000 + 1500);
            // setTimeout(function() {
            //     drone.clockwise(70);
            //     drone.right(25);
            // }, 3000);
            // setTimeout(function() {
            //     drone.stop();
            // }, 7000);
            // setTimeout(function() {
            //     drone.land();
            // }, 8000);

            drone.on("PositionChanged", (data) => {
                currentStats["gps-position"] = data;
                statsEvent({
                    "gps-position": data
                })
            });

            drone.on("BatteryStateChanged", (data) => {
                currentStats["battery"] = data.precent;
                console.log(data);
                statsEvent({
                    "battery": data.precent    
                });
            })

            drone.on("WifiSignalChanged", (data) => {
                currentStats["wifi-signal"] = data.rssi;
                statsEvent({
                    "wifi-signal": data.rssi
                });
            })
        });
    } 
}

// Methods
function statsEvent(data) {
    socketsCtrl.emitAll("statsEvent", data);
    eventListeners.stats.forEach((listener) => listener(data));
}

function actionEvent(data) {
    socketsCtrl.emitAll("actionEvent", data);
    eventListeners.actions.forEach((listener) => listener(data));
}

// API

module.exports.listenStatsEvents = (listener) => {
    eventListeners.stats.push(listener);
}

module.exports.listenActionEvents = (listener) => {
    eventListeners.actions.push(listener);
}

module.exports.getCurrentStats = () => {
    return currentStats;
}

module.exports.forward = () => {
    drone.forward(15);
}

module.exports.backward = () => {
    drone.backward(15);
}

module.exports.right = () => {
    drone.right(15);
}

module.exports.left = () => {
    drone.left(15);
}

module.exports.stop = () => {
    drone.stop();
}

module.exports.takeOff = () => {
    drone.takeOff();
}

module.exports.land = () => {
    drone.land();
}

// Commands mapping & settings
var commands = [
    { command: 'forward', cancel: 'stopForward' },
    { command: 'backward', cancel: 'stopBackward' },
    { command: 'right', cancel: 'stopRight' },
    { command: 'left', cancel: 'stopLeft' },
    { command: 'up', cancel: 'stopUp' },
    { command: 'down', cancel: 'stopDown' },
    { command: 'rotateRight', cancel: 'stopRotatingRight' },
    { command: 'rotateLeft', cancel: 'stopRotatingLeft' }
]

module.exports.validateCommand = (command) => {
    if (commands.findIndex((cmd) => cmd == command) == -1) {
        return false;
    } else {
        return true;
    }
}

module.exports.getAllValidCommands = () => {
    var allCommands = [];
    commands.forEach((cmd) => {
        allCommands.push(cmd.command);
        allCommands.push(cmd.cancel);
    })

    return allCommands;
}

module.exports.getCommands = () => {
    return commands;
}