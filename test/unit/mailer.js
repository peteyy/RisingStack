var mailer = require('./../../lib/helpers/mailer');
var expect = require('chai').expect;

describe('Mailer', function() {
  it('#sendsEmail', function(done) {
    var user = {
      username: 'Peter',
      email: 'p.czibik@gmail.com',
      token: 'TOKEN',
    };
    mailer.sendMail(user, function(err) {
      expect(err).to.be.null;
      done();
    });
  });
});
