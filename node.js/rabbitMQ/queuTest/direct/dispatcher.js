var amqp = require('amqp');
var fs = require('fs');
require('./config');

gps_topic = require('./topics/gps');

console.log( process.argv.length);
if ( process.argv.length != 5) {
	console.log(" Usage: node dispatcher.js topic params_json \"extra info\"" );
	return;
}

topic = process.argv[2];
params = JSON.parse(process.argv[3]);
test_message = process.argv[4];



// maybe this should be with a handler

try{
	// Query the entry
	stats = fs.lstatSync('./topics/' + topic + '.js');
}
catch (e){
	console.log("topic: " + topic + " does not exist");
	return;
}



var connection = amqp.createConnection({ host: "localhost", port: 5672 });
var count = 1;

exchange_options = {type : 'direct'};

connection.addListener('ready', function () {
	
  var exchange = connection.exchange(config.ENTYTY_CHANNEL_TOPIC, exchange_options, function(exchange) {
	  console.log( "Connected to exchange: " + exchange + " of type" +  exchange_options["type"] + ". All the clients will receive the message");
	  console.log( "Message to send " + test_message); 

	  var topic = gps_topic.render(config.ENTITY_ID, params, test_message);
	  
	  console.log(topic);
	  var encoded_payload = JSON.stringify(topic);
	  exchange.publish(config.PUB_KEY, encoded_payload );

	  console.log( "Already send it");
  	});
  
  
  setTimeout(function () {
      // wait one second to receive the message, then quit
      connection.end();
  }, 1000);


})

errorCallback = function(e) {
  throw e;
};

connection.addListener('error', errorCallback);
connection.addListener('close', function (e) {
  console.log('connection closed.');
});


