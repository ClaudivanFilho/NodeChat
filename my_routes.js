var index = require('./routes/index.route.js');
var user = require('./routes/user.route.js');
var chat = require('./routes/chat.route.js');
var local = require('./routes/local-auth.route.js');
var face = require('./routes/face-auth.route.js');

module.exports = function(app) {

    /**
     * local authentication
     */
    app.use('/', local);
    /**
     * Facebook authentication
     */
    app.use('/', face);
    /**
     * Aoi user
     */
    app.use('/', user);
    /**
     * Api chat
     */
    app.use('/', chat);

    /**
     * Initial routes
     */
    app.use('/', index);

    return app;
}
