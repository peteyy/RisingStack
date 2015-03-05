/**
 * External dependencies.
 */
var restify = require('restify');
var mongoose = require('mongoose');

var User = require('./models/User');
var mailer = require('./helpers/mailer');


/**
 * Database configuration
 */
var config = require('./config/database');
mongoose.connect(config.connectionString);


/**
 * Initialization of the server object
 */
var server = restify.createServer();

/**
 * Middleware configuration
 */
server.use(restify.queryParser());
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  return next();
});

/**
 * Routes
 */
server.get('/users', function(req, res) {
  User.getUserByToken(req.params.token)
  .then(function() {
    User.listUsers()
    .then(function(users) {
      res.send(users);
    }, function(error) {
      res.send(error);
    });
  }, function(error) {
    res.send(401, error);
  });
});

server.post('/register', function (req, res) {
  User.addUser(req.params)
    .then(function(user) {
      mailer.sendMail(user)
        .then(function(user) {
          res.send(200, user);
        }, function(err) {
          res.send(501, err);
        });
    }, function(err) {
      res.send(err);
    });
});

module.exports = server;
