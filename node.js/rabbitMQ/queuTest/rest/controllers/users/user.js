

exports.list = function(req, res){
	console.log("List of users");
	res.send("respond with a resources list");
};

exports.info = function(req, res){
	console.log("Info for user");
	res.send("info for id");
};