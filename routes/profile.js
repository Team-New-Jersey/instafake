var express = require('express');
var router = express.Router();
var multer = require('multer');
var models = require('../db');
var Posts = require('../db').posts;
var fs = require('fs');
var User = require('../db').users;

var myStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		var lgdUserDir = req.cookies['userid'];
		var dir = './public/images/user' + lgdUserDir;
		if (!fs.existsSync(dir)){
    		fs.mkdirSync(dir);
		}
		cb(null, __dirname + '/../public/images/user' + lgdUserDir)
	},
	filename: function (req, file, cb) { 
		function genRand() {
      		return Math.floor(Math.random()*89999999+10000000);
   		};
   		var imgNum = genRand();
		cb(null, file.fieldname + imgNum + '.' + file.mimetype.split('/')[1]);
	}
});

var requestHandler = multer({ storage: myStorage });

router.get('/', function(req, res) {
	res.render('profile');
});

router.post('/', requestHandler.single('image'), function(req, res, next) {
	var lgdUserId = req.cookies['userid'];
	var createdImg = req.file.filename;
	fs.createReadStream('public/images/user' + lgdUserId + '/' + createdImg).pipe(fs.createWriteStream('public/images/' + createdImg));
	Posts.create({
		description : req.body.description,
		user_id : lgdUserId,
		img_name : req.file.filename
	}).then((post) => {
		console.log("hello");
	});
	next();
	res.redirect('/api/protected/profile');
});

module.exports = router;




