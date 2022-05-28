var express = require('express');
var github = require("./github");

var router = express.Router();

router.use('/github', github);

module.exports = router;
