require('../config')
var publisher = require('./publisher')
var util = require('util')


exports.info = function(req, res){
	console.log(req);
	topic = topicsByChannel();
	url_pub = req['url'] + "/pub";
	msg =  util.format('{ \
		"code":200, \
		"desc":"topic info", \
		"pub": true, \
		"topic_pub": "%s"}' 		
		, url_pub);
	
	console.log(msg);
	res.type('application/json');
	res.send(msg);
};

exports.pub = function(req, res){

	console.log(req);
	query = req['query'];
	
	err = 0;
	params = {}
	
	if ("latitude" in query){
		params["latitude"] = query['latitude'];
	}
	else {
		returnError("lat parameter mandatory", res);
	}

	if ("longitude" in query){
		params["longitude"] = query['longitude'];
	}
	else {
		returnError("lat parameter mandatory", res);
	}
	if ( "extraTest" in query){
		params["extraTest"] = query['extraText'];
	}
	else {
		params["extraTest"] = "";
	}

	params.gps = params["latitude"] + "," + params["longitude"];
	params.from = "anonymous"
	
	cod = publisher.sendMessage("gps", params, params["extraTest"]);
	
	console.log("result " + cod);
	
	if (cod == 0) {
		msg =  util.format('{ \
			"code":400, \
			"desc":"error: message has not been sent"}');
		}
	else {
		msg =  util.format('{ \
			"code":200, \
			"desc":"message has been sent"}');
	}
	
	console.log(msg);
	res.type('application/json');
	res.send(msg);
};

function returnError(error, response){
	
	msg = {}
	msg["code"] = 400;
	msg["desc"] = error;
	
	response.type('application/json');
	response.send(msg);
	
}

function topicsByChannel(channelID){
	
	return config.TOPIC_TYPE; 
}

