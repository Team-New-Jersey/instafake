var express = require('express');
var router = express.Router();
var multer = require('multer');

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

    }


);
