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

// var myStorage = multer.diskStorage({

// 	destination: function (req, file, cb) {
// 		var lgdUserDir = req.cookies['userid'];
// 		var dir = './public/images/user' + lgdUserDir;

// 		if (!fs.existsSync(dir)){
//     		fs.mkdirSync(dir);
// 		}
// 		cb(null, __dirname + '/../public/images/user' + lgdUserDir)
// 	},

// 	filename: function (req, file, cb) { 
// 		function genRand() {
//       		return Math.floor(Math.random()*89999999+10000000);
//    		};
//    		var imgNum = genRand();

// 		cb(null, file.fieldname + imgNum + '.' + file.mimetype.split('/')[1]);
// 	}

// });
var myStorage = multerS3({
    s3: s3,
    bucket: 'instafake',
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
    	var lgdUserDir = req.cookies['userid'];
        cb(null, 'images' + lgdUserDir + '/' + Date.now().toString() '.jpg');
    }
});

var requestHandler = multer({ storage: myStorage });

// var uploadAWS = multer({
// 	storage: multerS3({
// 		s3: s3,
//         bucket: 'instafake',
//         acl: 'public-read',
//         // location: 'https://s3.amazonaws.com/instafake/',
//         metadata: function (req, file, cb) {
//         	console.log(file.fieldname);
//       cb(null, {fieldName: file.fieldname});
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString())
//     }
// }),
// });
  //       metadata: function (req, file, cb) {
  //           var lgdUserDir = req.cookies['userid'];
		// 	var dir = 'images/user' + lgdUserDir;

		// 	if (!fs.existsSync(dir)){
  //   			fs.mkdirSync(dir);
		// 	}
		// 	cb(null, dir)
  //       },
  //       key: function (req, file, cb) {
  //           function genRand() {
  //     			return Math.floor(Math.random()*89999999+10000000);
  //  			};
  //  			var imgNum = genRand();

		// 	cb(null, file.fieldname + imgNum + '.' + file.mimetype.split('/')[1]);
		// }
        
	// destination: function (req, file, cb) {
	// 	var lgdUserDir = req.cookies['userid'];
	// 	var dir = './public/images/user' + lgdUserDir;

	// 	if (!fs.existsSync(dir)){
 //    		fs.mkdirSync(dir);
	// 	}
	// 	cb(null, __dirname + '/../public/images/user' + lgdUserDir)
	// },

	// filename: function (req, file, cb) { 
	// 	function genRand() {
 //      		return Math.floor(Math.random()*89999999+10000000);
 //   		};
 //   		var imgNum = genRand();

	// 	cb(null, file.fieldname + imgNum + '.' + file.mimetype.split('/')[1]);
	// }


router.get('/', function(req, res) {

	lgdUserId = req.cookies['userid'];
    lgdUsername = req.cookies['username'];
	
	pool.connect(function(err, client, done) {
		if(err) throw err;
		client.query('SELECT ARRAY (SELECT id FROM users); SELECT ARRAY (SELECT username FROM users); SELECT ARRAY (SELECT id FROM posts); SELECT ARRAY (SELECT user_id FROM posts); SELECT ARRAY (SELECT description FROM posts); SELECT ARRAY (SELECT img_name FROM posts); SELECT ARRAY (SELECT id FROM likes); SELECT * FROM likes WHERE post_id IN (SELECT post_id FROM likes GROUP BY post_id having count(*) > 2); SELECT ARRAY (SELECT user_id FROM likes); SELECT ARRAY (SELECT post_id FROM likes); SELECT ARRAY (SELECT id FROM comments); SELECT ARRAY (SELECT comment FROM comments); SELECT ARRAY (SELECT user_id FROM comments); SELECT ARRAY (SELECT post_id FROM comments)',
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
	var location = req.file.location + createdImg;

	fs.createReadStream('images/user' + lgdUserId + '/' + createdImg).pipe(fs.createWriteStream('images/' + createdImg));

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

	fs.unlink("images/" + req.body.fileName);
	fs.unlink("images/user" + lgdUserId + "/" + req.body.fileName);

	res.redirect('/api/protected/profile');
});

module.exports = router;




