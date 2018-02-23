var bebop = require('node-bebop');
var Promise = require('promise');

var drone = bebop.createClient();
var connected = false;

console.log("Attempting to connect to the drone...");
// drone.connect(() => {
//     console.log("Drone connected");
//     connected = true;

//     drone.WifiSettings.outdoorSetting(0);

//     // drone.Piloting.takeOff();
//     // setTimeout(() => drone.Piloting.landing(), 5000);

//     drone.on("PositionChanged", (data) => {
//         console.log(data);
//     });

//     drone.on("BatteryStateChanged", (data) => {
//         console.log(data);
//     })

//     drone.on("WifiSignalChanged", (data) => {
//         // console.log(data);
//     })

//     drone.on("NumberOfSatelliteChanged", (data) => {
//         console.log(data);
//     })
// });

