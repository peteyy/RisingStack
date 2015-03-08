/**
 * External dependencies.
 */
var mongoose = require('mongoose');

var hasher = require('./../helpers/hasher');

var Promise = require('es6-promise').Promise;

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
schema.statics.findUsers = function() {
  return new Promise(function(resolve, reject) {
    User.find({}).select('-token -__v').exec(function(err, users) {
      if (err) {
        reject(err);
      } else {
        resolve(users);
      }
    });
  });
};

/**
 * Create a new user
 * @param {Object} user
 * @param {Function} next
 * @static
 */
schema.statics.createUser = function(user) {
  return new Promise(function(resolve, reject) {
    hasher.generateKey()
      .then(function(key) {
        var userToAdd = new User({
          username: user.username,
          email: user.email,
          token: key
        });
        user.save(function(err, user) {
          if (err) {
            reject(err);
          } else {
            resolve(user);
          }
        });
      });
  });
};

/**
 * Get user by token
 * @param {String} user
 * @param {Function} next
 * @static
 */
schema.statics.getUserByToken = function(token) {
  return new Promise(function(resolve, reject) {
    User.findOne({token: token}, function(err, user) {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
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
exports.addUser = function(user) {
  return User.createUser(user);
};

/**
 * Find all users
 * @param {Function} next
 * @api public
 */
exports.listUsers = function() {
  return User.findUsers();
};

/**
 * Get user by token
 * @param {String} user
 * @param {Function} next
 * @api public
 */
exports.getUserByToken = function(token) {
  return User.getUserByToken(token);
};
