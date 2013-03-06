var amqp = require('amqp');

connector = {};
connector.server = {};
connector.server.url = "amqp://bvpykrba:TDxUbbAgUvuJQLPn@kepqbsrv.rabbitmq-bigwig.lshift.net:23744/kepqbsrv"
//connector.server.host = "localhost";
//connector.server.port = 5672;

function createConnection(){
	console.log ("Connecting to " + connector.server);
	return  amqp.createConnection(connector.server);
}

exports.createConnection = createConnection;

errorCallback = function(e) {
  throw e;
};

