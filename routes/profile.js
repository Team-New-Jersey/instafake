var express = require('express');
var router = express.Router();
var multer = require('multer');
var pg = require('pg');
var fs = require('fs');
var User = require('../db').users;
var Posts = require('../db').posts;
var Comment = require('../db').comments;
var iLike = require('../db').likes;
require('dotenv').config();
var multerS3 = require('multer-s3');
var AWS = require('aws-sdk');

AWS.config.loadFromPath('./s3_config.json');
var s3 = new AWS.S3();


var pool = new pg.Pool({
    user: process.env.HEROKU_DB_USER,
    password: process.env.HEROKU_DB_PW,
    host: process.env.HEROKU_DB_HOST,
    port: 5432,
    database: process.env.HEROKU_DB_NAME
});

var lgdUserId;
var lgdUsername;

var myStorage = multerS3({
    s3: s3,
    bucket: 'instafake',
    acl: 'public-read',
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
    	var lgdUserDir = req.cookies['userid'];
        cb(null, Date.now().toString() + '.jpg');
    }
});

var requestHandler = multer({ storage: myStorage });

router.get('/', function(req, res) {

	lgdUserId = req.cookies['userid'];
    lgdUsername = req.cookies['username'];
	
	pool.connect(function(err, client, done) {
		if(err) throw err;
		client.query('SELECT ARRAY (SELECT id FROM users); SELECT ARRAY (SELECT username FROM users); SELECT ARRAY (SELECT id FROM posts); SELECT ARRAY (SELECT user_id FROM posts); SELECT ARRAY (SELECT description FROM posts); SELECT ARRAY (SELECT img_name FROM posts);',
		(err, result) => { 
			if (err) { throw err }
			
			var userIds = result[0].rows[0].array;
  			var usernames = result[1].rows[0].array;
  			var postIds = result[2].rows[0].array;
  			var postUserIds = result[3].rows[0].array;
  			var postDescriptions = result[4].rows[0].array;
  			var postImg = result[5].rows[0].array;
  			
  			
			res.render('profile', {
		    	lgdUserId: lgdUserId,
		    	lgdUsername: lgdUsername,
		    	userIds: userIds,
		    	usernames: usernames,
		    	postIds: postIds,
		    	postUserIds: postUserIds,
		    	postDescriptions: postDescriptions,
		    	postImg: postImg
			});
			done();
		});
	});
});

router.post('/', requestHandler.single('image'), function(req, res, next) {

	var lgdUserId = req.cookies['userid'];
	var createdImg = req.file.filename;

	Posts.create({
		description : req.body.description,
		user_id : lgdUserId,
		img_name : req.file.location
	});

	res.redirect('/api/protected/profile');
});

router.post('/edit', function(req, res, next) {

	Posts.update({
		description: req.body.edit,
	}, {
  		where: {
    		id: req.body.postIdEdit 
  		}
	});

	res.redirect('/api/protected/profile');
});

router.post('/delete', function(req, res, next) {
	var lgdUserId = req.cookies['userid'];

	Comment.destroy({
		where: {
			post_id : req.body.postIdDelete
		}
	});
	iLike.destroy({
		where: {
			post_id : req.body.postIdDelete
		}
	});
	Posts.destroy({
		where: {
			id : req.body.postIdDelete
		}
	});

	res.redirect('/api/protected/profile');
});

module.exports = router;
