var express = require('express');
var router = express.Router();
var multer = require('multer');
var models = require('../db');


module.exports = function(passport) {
	router.get('/home', require('connect-ensure-login').ensureLoggedIn(), function(req, res){
    	res.render('home', { user: req.user });
  	});
	router.get('/logout', function(req, res){
    	req.logout();
    	res.redirect('/');
  	});
  	return router;
};

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


// //Check if Genre with same name already exists
// Genre.findOne({ 'name': req.body.name })
//     .exec( function(err, found_genre) {
//     console.log('found_genre: '+found_genre)
//     if (err) { return next(err); }
//
//         if (found_genre) {
//             //Genre exists, redirect to its detail page
//             res.redirect(found_genre.url);
//             }
//         else {
//             genre.save(function (err) {
//                 if (err) { return next(err); }
//                     //Genre saved. Redirect to genre detail page
//                     res.redirect(genre.url);
//                 });
//         }
//
// });

// eg
