var bebop = require('node-bebop');
var Promise = require('promise');

var drone = bebop.createClient();
var connected = false;

console.log("Attempting to connect to the drone...");
drone.connect(() => {
    console.log("Drone connected");
    connected = true;

    // drone.Piloting.takeOff();
    // setTimeout(() => drone.Piloting.landing(), 6000);
})