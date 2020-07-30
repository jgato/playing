var amqp = require('amqp');
var sleep = require('sleep');
require('./config');

queu_options = { durable: false, autoDelete : true ,exclusive : true};

var connection = amqp.createConnection({ host: "localhost", port: 5672 });

connection.addListener('ready', function () { 
	
  connection.queue( "",  queu_options, 
	  function(queue){
	    queue.bind(config.ENTYTY_CHANNEL_TOPIC, config.PUB_KEY); 
	    // if ack = true no automatic acks are returned to the broker
	    // the broker retains the message waiting for acks
	    // So, you have to be in charge to notice you have finished,
	    // the broker will delete the message and you will recieve again
	    // message through the queu
	    
	    queue.subscribe( { ack: true }, function (message, headers, deliveryInfo) {
	    	var encoded_payload = unescape(message.data);
	    	var payload = JSON.parse(encoded_payload);
	    
	    	console.log("gps: " + payload["gps"] + " from " + payload["from"]);
	    	console.log('sending ack');
	    	
	    	// if something bad happens before the shift
	    	// the broker will never know if you have finished
	    	// analyzing the message. 
	    	// If the connection expires and the broker has not received
	    	// the ack, the broker will re-deliver the message through the queu
	    	// to other client. So, you ensure the message will be always
	    	// analyzed
	    	queue.shift();
	    });
    
  	  })
})


errorCallback = function(e) {
  throw e;
};

connection.addListener('error', errorCallback);
connection.addListener('close', function (e) {
  console.log('connection closed.');
});