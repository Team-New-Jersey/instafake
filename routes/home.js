var express = require('express');
var router = express.Router();
require('dotenv').config();
var http = require('http');
var pg = require('pg');
var _ = require('lodash');
require('./login');

var pool = new pg.Pool ({
	user: process.env.HEROKU_DB_USER,
    password: process.env.HEROKU_DB_PW,
    host: process.env.HEROKU_DB_HOST,
    port: 5432,
    database: process.env.HEROKU_DB_NAME
});

var User = require('../db').users;
var likeIt = require('../db').likes;
var Comment = require('../db').comments;

var lgdUserId;
var lgdUsername;

router.get('/', function(req, res, next) {

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
  			var likeIds = result[6].rows[0].array;
  			var likesPerPost = result[7].rows;
  			var likeUserIds = result[8].rows[0].array;
  			var likePostIds = result[9].rows[0].array;
  			var commentIds = result[10].rows[0].array;
  			var commentBodies = result[11].rows[0].array;
  			var commentUserIds = result[12].rows[0].array;
  			var commentPostIds = result[13].rows[0].array;
  			
			res.render('home', {
				_ : _,
		    	lgdUserId: lgdUserId,
		    	lgdUsername: lgdUsername,
		    	userIds: userIds,
		    	usernames: usernames,
		    	postIds: postIds,
		    	postUserIds: postUserIds,
		    	postDescriptions: postDescriptions,
		    	postImg: postImg,
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

	lgdUserId = req.cookies['userid'];

	likeIt.findOne({ where: {user_id : lgdUserId , post_id : req.body.postId} }).then(function(postLike) {
  		if (postLike) {
  			likeIt.destroy({
  				where: {
  					user_id : lgdUserId,
					post_id : req.body.postId
				}
  			})
  		} else {
			likeIt.create({
				user_id : lgdUserId,
				post_id : req.body.postId
			})
		};
	});

	res.redirect('/api/protected/');
});

router.post('/comment', function(req, res, next) {

	lgdUserId = req.cookies['userid'];

	Comment.create({
		comment : req.body.comment,
		user_id : lgdUserId,
		post_id : req.body.postIdComment
	});
	
	res.redirect('/api/protected/');
});

module.exports = router;
