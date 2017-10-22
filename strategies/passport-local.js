var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var saltRounds = require('../config/config');
var User = require("../db").users;