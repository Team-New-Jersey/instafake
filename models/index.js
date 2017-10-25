'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/..\config\config.js')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db),
    dbUsers.hasMany(db.Posts, {as: 'Posts'}),
    dbPosts.belongsTo(db.Users, {as: 'user_id'}),
    dbPosts.hasMany(db.Comments, {as: 'Comments'}),
    dbComments.belongsTo(db.Posts, {as: 'image_id'}),
    dbUsers.hasMany(db.Comments, {as: 'Posts'}),
    dbComments.belongsTo(db.Users, {as: 'username'}),
    dbPosts.hasMany(db.Likes, {as: 'Likes'}),
    dbLikes.belongsTo(db.Posts, {as: 'image_id'}),
    dbUsers.hasMany(db.Likes, {as: 'Likes'}),
    dbLikes.belongsTo(db.Users, {as: 'username'});
  }
});

// Is it supposed to be in the object.keys, or in a new function?



db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;