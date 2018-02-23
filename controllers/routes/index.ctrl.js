var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(path.join(req.app.get("root"), "/public/views/main.html"));
})

module.exports = router;