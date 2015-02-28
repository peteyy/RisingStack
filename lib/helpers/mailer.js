var Mailgun = require('mailgun-js');

var config = require('./../config');

var mailgun = new Mailgun(config.mailer);

exports.sendMail = function(user, next) {
  var mailToSend = {
    from: config.mailer.fromWho,
    to: user.email,
    subject: config.mailer.subject,
    html: '<h1>Your Token:</h1><a href="http://' + config.serverUrl + ':' +
      config.port + '/users?token=' + user.token +'">Check your fellow users</a>'
  };

  mailgun.messages().send(mailToSend, function(err, body) {
    if (err) {
      next(err);
    } else {
      next(null);
    }
  });
};
