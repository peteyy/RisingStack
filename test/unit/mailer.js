/*
 * var mailer = require('./../../lib/helpers/mailer');
var expect = require('chai').expect;
var sinon = require('sinon');
var mailgun = require('mailgun-js');

describe('Mailer', function() {
  it('#sendsEmail', function(done) {
    var user = {
      username: 'NiceGuy',
      email: 'hireme@guamil.com',
      token: 'TOKEN',
    };

    var body = {
      html: '<markup/>',
    };

    var testMock = {
      send: function (mail, callback) {
        callback(null, mail);
      }
    };

    sinon.stub(mailgun, 'messages').return(testMock);

    mailer.sendMail(user, function(err) {
      expect(err).to.be.null;
      done();
    });
  });
});
*/
