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

            // drone.Piloting.takeOff();
            // setTimeout(() => drone.Piloting.landing(), 5000);

            drone.on("PositionChanged", (data) => {
                currentStats["gps-position"] = data;
                statsEvent({
                    "gps-position": data
                })
            });

            drone.on("battery", (data) => {
                currentStats["battery"] = data.precent;
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