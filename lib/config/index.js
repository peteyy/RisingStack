/* Index.js */
var database = require('./database');
var mailer = require('./mailer');

module.exports = {
  database: database,
  mailer: mailer,
  port: 3000,
  serverUrl: 'localhost'
};
