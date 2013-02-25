var amqp = require('amqp');

connector = {};
connector.server = {};
connector.server.host = "localhost";
connector.server.port = 5672;

function createConnection(){

	connection = amqp.createConnection(config.server);
	
	/*
	 * Some listeners to manage errors and close connections
	 * 
	 */
	connection.addListener('error', errorCallback);
	connection.addListener('close', function (e) {
	  console.log('connection closed.')
	  return 1;
	});
	
	return connection;
	
}

exports.createConnection = createConnection;

errorCallback = function(e) {
  throw e;
};

