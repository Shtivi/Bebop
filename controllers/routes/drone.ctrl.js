var express = require('express');
var path = require('path');
var router = express.Router();
var bebop = require("../bebop.ctrl");

router.get('/stats', (req, res, next) => {
    res.send(bebop.getCurrentStats());
})

router.post('/commands', (req, res, next) => {
    if (bebop.validateCommand(req.body.command)) {
         //bebop[req.body.command]();
         res.send();
    } else {
        res.status(401).send("Invalid command");
    }
})

module.exports = router;