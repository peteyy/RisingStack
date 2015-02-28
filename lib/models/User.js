var mongoose = require('mongoose');

var hasher = require('./../helpers/hasher');

var schema = new mongoose.Schema({
  username: { type: String, required: true },
  token: { type: String, required: true },
  email: { type: String, required: true }
});

schema.path('email').validate(function (email) {
   var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
   return emailRegex.test(email);
}, 'Please provide a real e-mail address.');

schema.statics.findUsers = function(next) {
  this.find({}).select('-token -__v').exec(next);
};

schema.statics.createUser = function(user, next) {
  var newUser = new User({
    username: user.username,
    email: user.email,
    token: user.token
  });

  newUser.save(function (err) {
    if (err) {
      next(err, null);
    } else {
      next(null, newUser);
    }
  });
};

schema.statics.getUserByToken = function(token, next) {
  this.findOne({token: token}, next);
};

var User = mongoose.model('User', schema);

exports.addUser = function(user, next) {
  hasher.generateKey(function(key) {
    var userToAdd = {
      username: user.username,
      email: user.email,
      token: key
    };
    return User.createUser(userToAdd, next);
  });
};

exports.listUsers = function(next) {
  return User.findUsers(next);
};

exports.getUserByToken = function(token, next) {
  User.getUserByToken(token, function(err, user) {
    if (user) {
      next(null, user);
    } else {
      next(new Error('Invalid token.'), null);
    }
  });
};
