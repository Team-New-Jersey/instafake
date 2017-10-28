var express = require('express');
var router = express.Router();
var multer = require('multer');
var models = require('../db');

var User = require('../db').users;

router.get('/', function(req, res, next) {
	res.render('home');
});


var myStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/images')
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.NOW()+ '.' + file.mimetype.split('/')[1])
  }
});

// call myStorage?

var requestHandler = multer({ storage: myStorage })


router.post('/create', requestHandler.single('nameofField'),
    function(req, res, next) {
			models.post.findAll({
				include: [models.posts]

			}).then(function(allPosts) {
				res.render('home', {

				});
				models.likes.findAll({
					include: [models.posts]

				}).then(function(likes) {
					res.render('home', {

					});
			})
    }
);

module.exports = router


// //Check if Genre with same name already exists
// Genre.findOne({ 'name': req.body.name })
//     .exec( function(err, found_genre) {
//     console.log('found_genre: '+found_genre)
//     if (err) { return next(err); }
