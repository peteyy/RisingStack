/**
 * External dependencies.
 */
var crypto = require('crypto');
var Promise = require('es6-promise');

/**
 * Generates a random string containing 16 random bytes
 * in hexadecimal
 * @param {Function} next
 * @api public
 */
module.exports = {
  generateKey: function () {
    return new Promise(function(resolve, reject) {
      crypto.randomBytes(16, function(ex, buf) {
        if(ex) {
          reject(ex);
        } else {
          resolve(buf.toString('hex'));
        }
      });
    });
  }
};
