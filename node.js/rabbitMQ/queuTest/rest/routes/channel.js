
channel = require("../controllers/channels/channel")

/*
 * GET users listing.
 */

module.exports = function(app){

    app.get('/entities/:id/channels', channel.list)
    app.get('/entities/:id/channels/:channel', channel.info)

}