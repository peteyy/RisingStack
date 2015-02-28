var hippie = require('hippie');
var server = require('./../../lib/Server');

describe('Server', function() {
  describe('/users endpoint', function() {
    it('returns all the users', function(done) {
      hippie(server)
        .json()
        .get('/users?token=a6452a908d6e494b8dc7ea96e3d47253')
        .expectStatus(200)
        .end(done);
    });
  });
  describe('/register endpoint', function() {
    it('registers a new user', function(done) {
      hippie(server)
        .json()
        .post('/register?username=NewGuy&email=newGuy@gmail.com')
        .expectStatus(200)
        .end(done);
    });
  });
});
