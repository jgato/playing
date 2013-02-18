var amqp = require('amqp');

connector = {};
connector.server = {};
connector.server.host = "localhost";
connector.server.port = 5672;

function createConnection(){

	return  amqp.createConnection(config.server);
}

exports.createConnection = createConnection;

errorCallback = function(e) {
  throw e;
};

