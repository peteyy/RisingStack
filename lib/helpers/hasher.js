var crypto = require('crypto');

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
