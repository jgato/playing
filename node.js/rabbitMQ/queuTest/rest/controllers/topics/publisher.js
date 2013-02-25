
var fs = require('fs');

gps_topic = require('./topics/gps');
var publisher_connection = require('./brokerConnector');


exports.sendMessage = function(topic, params, extraText){
	
	
	var connection = publisher_connection.createConnection();
	
	
	/*
	 * Now the real core, you connect to an existing and configured
	 * exchange and publish information about a type of topic
	 * in this case GPS update
	 */
	connection.addListener('ready', function () {
		  
		connection.exchange( name = config.PUB_KEY, options = config.EXCHANGE_OPTIONS, function(exchange) {
		
			var topic = gps_topic.render(config.ENTITY_ID, params, extraText);
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
	


}



