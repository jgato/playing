require('../config')
var util = require('util')

exports.list = function(req, res){
	msg =  util.format('{ "code":200, "desc":"channels list", "channels": [ {"channel": "%s" } ] } '
	, channelsList());
	res.type('application/json');
	res.send(msg);
};

exports.info = function(req, res){
	console.log(req);
	topic = topicsByChannel();
	msg =  util.format('{ \
		"code":200, \
		"desc":"channel info", \
		"topic" : "%s" , \
		"id": "%s", \
		"topic_url": "%s" }' 		
		, topic,req['params']['channel'], req['url'] + "/" +topic);
	
	console.log(msg);
	res.type('application/json');
	res.send(msg);
};


function topicsByChannel(channelID){
	
	return config.TOPIC_TYPE; 
}

function channelsList() {
	return config.PUB_KEY;
}