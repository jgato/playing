
topic = require("../controllers/topics/topic")

/*
 * GET users listing.
 */

module.exports = function(app){

    app.get('/entities/:entity/channels/:channel/:topic', topic.info)
    app.get('/entities/:entity/channels/:channel/:topic/pub', topic.pub)

}