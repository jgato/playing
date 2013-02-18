
var fs = require('fs');
require('./config');
var publisher_connection = require('./brokerConnector');



var connection = publisher_connection.createConnection();
connection.addListener('ready', function () {
	  
	connection.exchange( name = config.PUB_KEY, options = config.EXCHANGE_OPTIONS, function(exchange) {
	  console.log( "Created exchange: " + exchange.name + " of type " +  config.EXCHANGE_OPTIONS["type"] + ". All the clients will receive the message");


	  connection.queue( name = config.SUB_KEY, options = config.QUEU_OPTIONS, function(queue){
		  
		  console.log("Queue created " + queue.name);
		  
		  queue.bind( exchange = config.PUB_KEY, routing = config.TOPIC_TYPE); 
		  
		  console.log("Bind done it with the routing key " + config.TOPIC_TYPE);


		  });
  	});
  

})

errorCallback = function(e) {
  throw e;
};

connection.addListener('error', errorCallback);
connection.addListener('close', function (e) {
  console.log('connection closed.');
});


