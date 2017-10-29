var express = require('express');
var router = express.Router();
var multer = require('multer');
var models = require('../db');


var User = require('../db').users;

	router.get('/profile', function(req, res) {
		res.render('profile');
	});

var myStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, __dirname + '/../public/images/user-images')
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1])
	}
});



var upload = multer({ storage: myStorage })
//
// router.get('/create', function(req, res, next) {
// 	res.render('product/create', {title: 'User Image Create', nav: 'Create'})
// });

// router.post('/create', upload.single('productImage'), function(req, res, next) {
//
// 	//call the sharp() function passing in the image we want to resize
// 	sharp(__dirname + '/../public/images/user-images/' + req.file.filename)
//
// 	// ignoreAspectRatio will not crop the image to fit the desired size
// 	.ignoreAspectRatio()
//
// 	// resize image to these dimensions (w x h) in pixels
// 	.resize(200, 200)
//
// router.post('/create', requestHandler.single('userImage'),
//     function(req, res, next) {
// 			.toFile(__dirname + '/../public/images/user-images/thumbnails/' + req.file.filename, (err, info) => {
// 				posts.addPost(req.body, req.file.filename)
// 				res.redirect('/');
				// what do you use to show the result of create on the refreshed page...
		// 	});
		// });
// 
//
// router.get('/:post_id', function(req, res, next) {
// 	var product = products.findById(req.params.id);
// 	res.render('post/show', {post: post, title: 'Product Details', nav: 'Product'})
// });







module.exports = router;
