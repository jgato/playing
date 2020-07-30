gps = {
       "from" : "default",
       "gps" : "default",
       "TimeStamp" : "defalt", 
       "Extra" : "default"
       
};

function check_entity(entity) {
	return true;
}

exports.render = function (from, params, extra) {
	
	if (check_entity(from)) { 
		
		gps["from"] = from;
	}
	else {
		console.log ("Bad from info");
	}
	console.log(params);
	console.log(params["gps"]);
	gps["gps"] = params["gps"];
	gps["extra"] = extra;
	gps["TimeStamp"] = new Date();
	
	return gps;
}