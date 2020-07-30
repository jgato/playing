var amqp = require('amqp');
require('./config');

console.log( process.argv.length);

if ( process.argv.length != 3) {
	console.log(" Usage: node dispatcher.js \"text_message\"" );
	return;
}

test_message = process.argv[2];


var connection = amqp.createConnection({ host: "localhost", port: 5672 });
var count = 1;

connection.addListener('ready', function () {
  var sendMessage = function(connection, queue_name, payload) {
    var encoded_payload = JSON.stringify(payload);

    connection.publish(queue_name, encoded_payload);
  }

  console.log( "Ready to send: " + test_message);

  console.log( "Trough channel " + config.CHANNEL);
  sendMessage(connection, config.CHANNEL, test_message)  

  console.log( "Already send it");
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


