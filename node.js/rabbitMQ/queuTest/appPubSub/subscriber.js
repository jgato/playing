var amqp = require('amqp');
require('./config');
var publisher_connection = require('./brokerConnector');



/*
 * The core of the program, you just connect to an existing queue
 * and be prepared to receive messages. You just need the queue identification
 * not caring about previous binds of topics that you will receive (it is up to you
 * to be connected to the right queue)
 */

var connection = publisher_connection.createConnection();
connection.addListener('ready', function () { 
	
  connection.queue( name = config.SUB_KEY,  config.QUEU_OPTIONS, 
	  function(queue){
	    
	    queue.subscribe( { ack: true }, function (message, headers, deliveryInfo) {
	    	var encoded_payload = unescape(message.data);
	    	var payload = JSON.parse(encoded_payload);
	    
	    	console.log("gps: " + payload["gps"] + " from " + payload["from"]);
	    	console.log('sending ack');

	    	queue.shift();
	    });
    
  	  })
})

/*
 * some listeners for errors managment and close connections
 */

errorCallback = function(e) {
  throw e;
};

connection.addListener('error', errorCallback);
connection.addListener('close', function (e) {
  console.log('connection closed.');
});
