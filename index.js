var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
// socket chat
var http = require('http').Server(app);

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());// parser post requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
app.use(methodOverride('X-HTTP-Method-Override')); // allow put requests

require('./config/local-auth')(app); // Local authentication config
require('./config/face-auth')(app); // Facebook authentication config
require('./my_routes')(app); // define my routes
require('./socket/chat.js')(http); // events of chat

if (process.env.NODE_ENV != "TESTING") {
    (require('./config/database')(app)).connect()
}

http.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;
