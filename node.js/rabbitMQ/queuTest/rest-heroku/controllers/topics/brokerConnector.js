var amqp = require('amqp');

connector = {};
connector.server = {};
//connector.server.host = "localhost";
//connector.server.port = 5672;

connector.server.url = "amqp://bvpykrba:TDxUbbAgUvuJQLPn@kepqbsrv.rabbitmq-bigwig.lshift.net:23744/kepqbsrv"


function createConnection(){

	connection = amqp.createConnection(connector.server);
	
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

