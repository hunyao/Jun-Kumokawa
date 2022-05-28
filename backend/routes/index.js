var express = require('express');
var router = express.Router();
var path = require("path");

router.get('*', async function(req, res, next) {
    res.sendFile(path.resolve(__dirname, "../../build/index.html"))
})

module.exports = router;
