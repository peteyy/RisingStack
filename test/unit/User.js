var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

var User = require('./../../lib/models/User');
var UserModel = mongoose.model('User');
var hasher = require('./../../lib/helpers/hasher');

describe('User', function() {
  it('#listsUsers', function (done) {
    // SetUp
    var usersToReturn = [{
      name: 'TestGuy1',
      email: 'test@gmail.guy',
      token: 'TEsRTEsER'
    }, {
      name: 'TestGuy2',
      email: 'test@gmail.guy',
      token: 'TEWADTWWeEwadaR'
    }];

    sinon.stub(UserModel, 'findUsers').yields(null, usersToReturn);

    User.listUsers(function (err, users) {

      // Assertions
      expect(err).to.be.null;
      expect(users).to.eql(
          [{
            name: 'TestGuy1',
            email: 'test@gmail.guy',
            token: 'TEsRTEsER'
          }, {
            name: 'TestGuy2',
            email: 'test@gmail.guy',
            token: 'TEWADTWWeEwadaR'
          }]
      );

      done();
    });
  });

  it('#createsUser', function (done) {
    // SetUp
    var user = {
      username: 'Peter',
      email: 'email2'
    };
    var userToAdd = {
      username: 'Peter',
      email: 'email',
      key: 'KEY'
    };

    sinon.stub(UserModel, 'createUser').yields(null, userToAdd);

    User.addUser(user, function (err, addedUser) {

      // Assertions
      expect(err).to.be.null;
      expect(addedUser.username).to.eql('Peter');
      expect(addedUser.email).to.eql('email');
      expect(addedUser.key).to.eql('KEY');
      done();
    });
  });

  it('#getsUserByToken', function (done) {
    // SetUp
    var token = 'TOKEN';

    var user = {
      username: 'whatever',
      token: 'TOKEN',
      email: 'email',
    };

    sinon.stub(UserModel, 'getUserByToken').yields(null, user);

    User.getUserByToken(token, function (err, userFromDb) {

      // Assertions
      expect(err).to.be.null;
      expect(userFromDb.username).to.eql('whatever');
      expect(userFromDb.email).to.eql('email');
      done();
    });
  });
});
