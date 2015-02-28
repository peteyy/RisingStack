/**
 * External dependencies.
 */
var mongoose = require('mongoose');

var hasher = require('./../helpers/hasher');

/**
 * User schema
 */
var schema = new mongoose.Schema({
  username: { type: String, required: true },
  token: { type: String, required: true },
  email: { type: String, required: true }
});

/**
 * E-mail regex validation
 */
schema.path('email').validate(function (email) {
   var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
   return emailRegex.test(email);
}, 'Please provide a real e-mail address.');

/**
 * Find all users
 * @param {Function} next
 * @static
 */
schema.statics.findUsers = function(next) {
  this.find({}).select('-token -__v').exec(next);
};

/**
 * Create a new user
 * @param {Object} user
 * @param {Function} next
 * @static
 */
schema.statics.createUser = function(user, next) {
  hasher.generateKey(function(key) {
    var userToAdd = new User({
      username: user.username,
      email: user.email,
      token: key
    });
    userToAdd.save(next);
  });
};

/**
 * Get user by token
 * @param {String} user
 * @param {Function} next
 * @static
 */
schema.statics.getUserByToken = function(token, next) {
  this.findOne({token: token}, next);
};

/**
 * Register the User model
 */
var User = mongoose.model('User', schema);

/**
 * Create a new user
 * @param {Object} user
 * @param {Function} next
 * @api public
 */
exports.addUser = function(user, next) {
  return User.createUser(user, next);
};

/**
 * Find all users
 * @param {Function} next
 * @api public
 */
exports.listUsers = function(next) {
  return User.findUsers(next);
};

/**
 * Get user by token
 * @param {String} user
 * @param {Function} next
 * @api public
 */
exports.getUserByToken = function(token, next) {
  User.getUserByToken(token, function(err, user) {
    if (user) {
      next(null, user);
    } else {
      next(new Error('Invalid token.'), null);
    }
  });
};
