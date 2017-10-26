var express = require('express')
var multer = require('multer')

var myStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/images')
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.NOW()+ '.' + file.mimetype.split('/')[1])
  }
});

myStorage();

var requestHandler = multer({ storage: myStorage })

router.post('/create', requestHandler.single('nameofField'),
    function(req, res, next) {

    }

);
//
// var sharp = require('sharp');
// router.post('/myRoute', function(req, res, next) {
//   //call the sharp() function passing in the image we want to resize
//   sharp('path/to/my/image')
//   // ignoreAspectRatio will not crop the image to fit the desired size
//   .ignoreAspectRatio()
//   // resize image to these dimensions (w x h) in pixels
//   .resize(0, 0)
//   // specify where to save the result
//   .toFile('path/to/save/image', function(err, info) {
//
//             res.redirect('/');
//   });
// });
