var express = require('express');
var router = express.Router();

// Import routes & controllers
var index = require('./routes/index.ctrl');

// Define routing
router.use('/', index);

module.exports = router;