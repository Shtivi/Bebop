var fs = require("fs");

// Init
var config = JSON.parse(fs.readFileSync('./controllers/drone/drone.config.json', 'utf8'));

module.exports.getSettings = () => config;
module.exports.saveSettings = (newConfig) => {
    config = newConfig;
    fs.writeFileSync('drone.config.json', newConfig, {encoding: 'utf8'})
}