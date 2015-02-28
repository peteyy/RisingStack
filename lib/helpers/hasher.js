/**
 * External dependencies.
 */
var crypto = require('crypto');

/**
 * Generates a random string containing 16 random bytes
 * in hexadecimal
 * @param {Function} next
 * @api public
 */
module.exports = {
  generateKey: function (next) {
      crypto.randomBytes(16, function(ex, buf) {
        if(ex) {
          throw ex;
        } else {
          next(buf.toString('hex'));
        }
      });
   },
};
