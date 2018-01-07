var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV;

// Load DB config from config file
var config = require(path.join(__dirname, 'config', 'config.js'));

// Init sequelize with params from config file
console.log('Create sequelize...');
var sequelize = new Sequelize(config.database, config.username, config.password, config);

// Empty db object to hold our models
var db = {};

fs.readdirSync(path.join(__dirname, 'models'))
.filter(function(file) {
	// load all files except index.js (this file)
	return (file.indexOf(".") !== 0) && (file !== "index.js");
})
.forEach(function(file) {
	// For every model file, add the model to our db object
	var model = sequelize.import(path.join(__dirname, 'models', file));
	db[model.name] = model;
});


var users = sequelize.define('users', {
  user_id: Sequelize.INTEGER,
  username: Sequelize.TEXT,
  password: Sequelize.TEXT
});

var posts = sequelize.define('posts', {
  post_id: Sequelize.INTEGER,
  user_id: Sequelize.INTEGER,
	title: Sequelize.TEXT,
  description: Sequelize.TEXT,
  created_at: Sequelize.DATE
});

var comments = sequelize.define('comments', {
  username: Sequelize.TEXT,
  post_id: Sequelize.INTEGER,
  comment: Sequelize.TEXT,
  created_at: Sequelize.DATE,
  updated_at: Sequelize.DATE
});

var likes = sequelize.define('likes', {
  username: Sequelize.TEXT,
  post_id: Sequelize.INTEGER,
  thumbs_up: Sequelize.BOOLEAN,
  created_at: Sequelize.DATE
});

//
// sequelize
//   .sync()
//   .then(function(){
//     return users.create({
//       username: 'hey3',
//       password: 'hey3'
//     })
//   })
  // .then(function(hey3){
	// 	return posts.create({
	// 		user_id: hey3.get('user_id'),
	// 		title: 'hello',
	// 		description: 'moving'
	// 	})
	// })
	// (leave the above commented out if testing the username foreign key for likes and comments)
	// .then(function(hey3 ----- change this to hello if testing the post_id foreign key){
	// 	var newComments = comments.create({
	// 		username: hey3.get('username'),
	// 		// post_id: hello.get('post_id'),
	// 		comment: 'yes please?'
	// 	})
	// 	return newComments
	// })
	// .then(function() {
	// 	console.log('Success?')
	// });

	// for the foreign keys, if the code below isn't working everything should
	// be fine so long as the forms can pull post_id, username or user_id and
	// submit them to the database

// Loop through models and check for the associate method.
// If the associate method exists, call it.
// The associations defined in our models will then initialized.
Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db),
		dbusers.hasMany(db.posts, {as: 'posts'}),
		dbposts.belongsTo(db.users, {as: 'user_id'}),
		dbposts.hasMany(db.comments, {as: 'comments'}),
		dbcomments.belongsTo(db.posts, {as: 'post_id'}),
		dbusers.hasMany(db.comments, {as: 'comments'}),
		dbcomments.belongsTo(db.users, {as: 'username'}),
		dbposts.hasMany(db.likes, {as: 'likes'}),
		dblikes.belongsTo(db.posts, {as: 'post_id'}),
		dbusers.hasMany(db.likes, {as: 'likes'}),
		dblikes.belongsTo(db.users, {as: 'username'});
  }
});

// Use sequelize with uppercase or lowercase
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
