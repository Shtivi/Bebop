var express = require('express');
var path = require('path');
var router = express.Router();
var bebop = require("../bebop.ctrl");

router.get('/stats', (req, res, next) => {
    res.send(bebop.getCurrentStats());
})

module.exports = router;