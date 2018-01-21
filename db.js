var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");

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
	username: Sequelize.TEXT,
	password: Sequelize.TEXT
});

var posts = sequelize.define('posts', {
	user_id: Sequelize.INTEGER,
	img_name: Sequelize.TEXT,
	description: Sequelize.TEXT
});

var comments = sequelize.define('comments', {
  username: Sequelize.TEXT,
  post_id: Sequelize.INTEGER,
  comment: Sequelize.TEXT
});

var likes = sequelize.define('likes', {
  username: Sequelize.TEXT,
  post_id: Sequelize.INTEGER,
  thumbs_up: Sequelize.BOOLEAN
});

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

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
