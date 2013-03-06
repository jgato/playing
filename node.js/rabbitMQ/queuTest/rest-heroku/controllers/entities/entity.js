
require("../config")
var util = require('util')

exports.list = function(req, res){
	console.log("List of entities");
	
	msg = util.format('{ "code":200, "desc":"list of entities", "entities":[ { "id":"%s" }] } '
		, entitiesList());
	res.type('application/json');
	res.send(msg);
};

exports.info = function(req, res){

	id = req['params']['entity'];
	channels = req['url'] + "/channels";
	msg =  util.format('{ "code":200, "desc":"registered entity", "id": "%s", "channels": "%s"  } '
		, id, channels);
	
	console.log(msg);
	res.type('application/json');
	res.send(msg);
};


function entitiesList() {
	return config.ENTITY_ID;
}

