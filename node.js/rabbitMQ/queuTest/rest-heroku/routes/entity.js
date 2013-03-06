
entity = require("../controllers/entities/entity")

/*
 * GET users listing.
 */

module.exports = function(app){

    app.get('/entities', entity.list)
    app.get('/entities/:entity', entity.info)

}