var server = require('./lib/Server');

var config = require('./lib/config');

server.listen(config.port, function() {
  console.log('Server is listening at ' + config.port);
});
