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
var config = require('./config');
mongoose.connect(config.database.connectionString);


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
  User.getUserByToken(req.params.token, function(err, user) {
    if (err) {
      res.send(401, err);
    } else {
      User.listUsers(function (error, users) {
        if (error) {
          res.send(error);
        } else {
          res.send(200, users);
        }
      });
    }
  });
});

server.post('/register', function (req, res) {
  User.addUser(req.params, function(err, user) {
    if (err) {
      res.send(err);
    } else {
      mailer.sendMail(user, function(err) {
        if (err) {
          //Log it with morgan? whatever...
          console.log(err);
        }
        res.json(user);
      });
    }
  });
});

module.exports = server;
