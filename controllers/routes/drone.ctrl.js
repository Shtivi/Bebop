var express = require('express');
var path = require('path');
var router = express.Router();
var bebop = require("../drone/bebop.ctrl");
var settings = require("../drone/settings.mgr");

router.get('/stats', (req, res, next) => {
    res.send(bebop.getCurrentStats());
})

router.get('/commands', (req, res, next) => {
    res.send(bebop.getCommands())
})

router.get('/settings', (req, res, next) => {
    res.send(settings.getSettings());
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