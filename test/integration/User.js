var hippie = require('hippie');
var server = require('./../../lib/Server');

describe('Server', function() {
  describe('/users endpoint', function() {
    it('returns all the users', function(done) {
      hippie(server)
        .json()
        .get('/users?token=c25b192c718be32695c9d04056f70a1b')
        .expectStatus(200)
        .end(done);
    });
  });
  describe('/register endpoint', function() {
    it('registers a new user', function(done) {
      hippie(server)
        .json()
        .post('/register?username=NewGuy&email=p.czibik@gmail.com')
        .expectStatus(200)
        .end(done);
    });
  });
});
