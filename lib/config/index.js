/**
 * External dependencies.
 */
var database = require('./database');
var mailer = require('./mailer');

/**
 * Pulls togeather all configuration in one object
 */
module.exports = {
  database: database,
  mailer: mailer,
  port: 3000,
  serverUrl: 'localhost'
};
