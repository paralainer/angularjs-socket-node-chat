var express = require('express')
    , app = express()
    , http = require('http')
    , server = http.createServer(app)
    , socket = require('./socket/socket.js')
    , io = require('socket.io').listen(server)
    , mongoose = require('mongoose');

mongoose.connect('mongodb://dozor:dozor@ds031751.mongolab.com:31751/dozor');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("Connected to Mongo DB");
});

global.__base = __dirname;

// Heroku config only
if (process.env.PORT) {
    io.configure(function () {
        io.set("transports", ["xhr-polling"]);
        io.set("polling duration", 10);
    });
}


// Configuration
require('./config')(app, express);
// Routes
require('./routes')(app);

io.of("/chat1").on('connection', socket);
io.of("/chat2").on('connection', socket);

// Start server
var port = process.env.PORT || 5001;

server.listen(port);