var express = require('express');
var router = express.Router();
var models = require('../db');

var User = require('../db').users;

router.get('/logout', function(req, res, next) {
	res.render('logout');
});




module.exports = router;
