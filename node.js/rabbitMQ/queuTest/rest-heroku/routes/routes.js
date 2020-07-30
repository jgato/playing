var fs = require('fs');


//console.log ("Adding new routes");
//
//module.exports = function(app) {
//    fs.readdirSync(__dirname).forEach(function(file) {
//        if (file === "index.js" || file.substr(file.lastIndexOf('.') + 1) !== 'js')
//            return;
//        var name = file.substr(0, file.indexOf('.'));
//        require('./' + name)(app);
//        console.log ("Route for " + './' + name)
//    });
//}

console.log(" Routes added ")

/*
 * manually if auto-detec above not working
 * 
 */
	

module.exports = function(app){

	console.log("exporting routes for users");
	
	require("./user")(app)
	require("./entity")(app)
	require("./channel")(app)
	require("./topic")(app)
}

