var express = require('express');
var router = express.Router();
var multer = require('multer');
var pg = require('pg');
var fs = require('fs');
var User = require('../db').users;
var Posts = require('../db').posts;
var Comment = require('../db').comments;
var iLike = require('../db').likes;

var pool = new pg.Pool({
	host: 'localhost',
	user: 'postgres',
	port: 1234,
	database: 'instabase',
	password: 'Coyot3$mith!511'
});

var lgdUserId;
var lgdUsername;

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

	fs.createReadStream('public/images/user' + lgdUserId + '/' + createdImg).pipe(fs.createWriteStream('public/images/' + createdImg));

	Posts.create({
		description : req.body.description,
		user_id : lgdUserId,
		img_name : req.file.filename
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

	fs.unlink("./public/images/" + req.body.fileName);
	fs.unlink("./public/images/user" + lgdUserId + "/" + req.body.fileName);

	res.redirect('/api/protected/profile');
});

module.exports = router;




