var express = require('express');
var router = express.Router();
var pg = require('pg');
require('./login');

var pool = new pg.Pool({
	host: 'localhost',
	user: 'postgres',
	port: 1234,
	database: 'instabase',
	password: ''
});

var User = require('../db').users;

router.get('/', function(req, res, next) {
	var lgdUserId = req.cookies['userid'];
    var lgdUsername = req.cookies['username'];
	
	pool.connect(function(err, client, done) {

		if(err) throw err; 
		client.query('SELECT ARRAY (SELECT id FROM users); SELECT ARRAY (SELECT username FROM users); SELECT ARRAY (SELECT id FROM posts); SELECT ARRAY (SELECT user_id FROM posts); SELECT ARRAY (SELECT description FROM posts); SELECT ARRAY (SELECT id FROM likes); SELECT * FROM likes WHERE post_id IN (SELECT post_id FROM likes GROUP BY post_id having count(*) > 2); SELECT ARRAY (SELECT user_id FROM likes); SELECT ARRAY (SELECT post_id FROM likes); SELECT ARRAY (SELECT id FROM comments); SELECT ARRAY (SELECT comment FROM comments); SELECT ARRAY (SELECT user_id FROM comments); SELECT ARRAY (SELECT post_id FROM comments)', 
			(err, result) => {
 			if (err) {
   	 			throw err
 			}

   	 		
			var userIds = result[0].rows[0].array; 
  			var usernames = result[1].rows[0].array;
  			var postIds = result[2].rows[0].array;
  			var postUserIds = result[3].rows[0].array; 
  			var postDescriptions = result[4].rows[0].array; 
  			var likeIds = result[5].rows[0].array;
  			var likesPerPost = result[6].rows;
  			var likeUserIds = result[7].rows[0].array; 
  			var likePostIds = result[8].rows[0].array; 
  			var commentIds = result[9].rows[0].array; 
  			var commentBodies = result[10].rows[0].array; 
  			var commentUserIds = result[11].rows[0].array;
  			var commentPostIds = result[12].rows[0].array;
  					
			// done();
			// pool.end();
			res.render('home', { 
		    	lgdUserId: lgdUserId,
		    	lgdUsername: lgdUsername,
		    	userIds: userIds,
		    	usernames: usernames,
		    	postIds: postIds,
		    	postUserIds: postUserIds,
		    	postDescriptions: postDescriptions,
		    	likeIds: likeIds,
		    	likesPerPost: likesPerPost,
		    	likeUserIds: likeUserIds,
		    	likePostIds: likePostIds,
		    	commentIds: commentIds,
		    	commentBodies: commentBodies,
		    	commentUserIds: commentUserIds,
		    	commentPostIds: commentPostIds
			});
			done();
		});
	});
});

router.post('/', function(req, res, next) {
	res.redirect('/api/protected/');
});

module.exports = router;

// multer routes
// each user will have their own images folder in public/images titled 'userimages' + user id
// each image, regardless of the folder its in, will be named 'post' + post id, and resides in the user folder with specific id and the collective images folder
// so when entering the src for an img in views, an example would be '/public/images/post' + postIds
// or 'public/images/userImages' + userIds + '/post' + postIds
// these example routes are mostly for the home.ejs forEach loop, and once I finish the routes for profile.js, this method will become clearer