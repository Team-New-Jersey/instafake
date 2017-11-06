var express = require('express');
var router = express.Router();
var multer = require('multer');
var models = require('../db');
var Posts = require('../db').posts;
var fs = require('fs');


var User = require('../db').users;


var lgdUserDir;

var myStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		
		lgdUserDir = req.cookies['userid'];
		var dir = './public/images/user' + lgdUserDir;
		if (!fs.existsSync(dir)){
    		fs.mkdirSync(dir);
		}
		cb(null, __dirname + '/../public/images'),
		cb(null, __dirname + '/../public/images/user' + lgdUserDir)
	},
	filename: function (req, file, cb) {
		console.log(cb);
		cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
	}
});

var requestHandler = multer({ storage: myStorage });

router.get('/', function(req, res) {
	res.render('profile');
});

router.post('/', requestHandler.single('image'), function(req, res, next) {
	// var lgdUserId = req.cookies['userid'];
	// console.log(req.file.fieldname);
	Posts.create({
		description : req.body.description,
		user_id : lgdUserId
	}).then((post) => {
		console.log("hello")
	});
	next();
	res.redirect('/api/protected/profile');
});

module.exports = router;




