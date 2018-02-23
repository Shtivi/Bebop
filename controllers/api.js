var express = require('express');
var router = express.Router();

module.exports = (opts) => {
    // Import routes & controllers
    var index = require('./routes/index.ctrl');
    var droneCtrl = require("./routes/drone.ctrl");

    // Define routing
    router.use('/', index);
    router.use('/drone', droneCtrl);

    return router;
}