var express = require('express');
var router = express.Router();
var models = require('../db');

var User = require('../db').users;

router.get('/', function(req, res, next) {
	res.render('logout');
	res.cookie('jwt', '');
	res.cookie('username', '');
	res.cookie('userid', '');
});

module.exports = router;
