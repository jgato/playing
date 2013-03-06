
user = require("../controllers/users/user")

/*
 * GET users listing.
 */

module.exports = function(app){

    app.get('/users', user.list)
    app.get('/users/:id', user.info)

}


