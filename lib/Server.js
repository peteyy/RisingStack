/**
 * External dependencies.;
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

function authUser(req, res, next) {
  User.getUserByToken(req.params.token)
    .then(function(user) {
      return next();
    })
    .catch(function(err) {
      return res.send(500, err);
    });
}

/**
 * Routes
 */
server.get('/users', authUser, function(req, res) {
  User.listUsers()
    .then(function(users) {
      res.send(users);
    })
    .catch(function(error) {
      res.send(500, error);
    });
});

server.post('/register', function (req, res) {
  User.addUser(req.params)
    .then(mailer.sendMail)
      .then(res.send)
      .catch(function(err) {
        res.send(err);
    });
});

module.exports = server;
