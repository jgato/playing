
var fs = require('fs');
require('./config');
var publisher_connection = require('./brokerConnector');


/* 
 * some stuff to analyze command argument line
 */
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

var connection = publisher_connection.createConnection();


/*
 * Now the real core, you connect to an existing and configured
 * exchange and publish information about a type of topic
 * in this case GPS update
 */
connection.addListener('ready', function () {
	  
	connection.exchange( name = config.PUB_KEY, options = config.EXCHANGE_OPTIONS, function(exchange) {
	
		var topic = gps_topic.render(config.ENTITY_ID, params, test_message);
	    console.log(topic);
		var encoded_payload = JSON.stringify(topic);
		
		exchange.publish(config.TOPIC_TYPE, encoded_payload, { persistant :  2} );


		console.log( "Already send it");
	  
	    setTimeout(function () {
	    	// wait one second to receive the message, then quit
	    	connection.end();
	    }, 1000);
  	});
  

})

/*
 * Some listeners to manage errors and close connections
 * 
 */
connection.addListener('error', errorCallback);
connection.addListener('close', function (e) {
  console.log('connection closed.');
});


