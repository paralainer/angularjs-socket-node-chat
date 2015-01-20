var express = require('express')
    , app = express()
    , http = require('http')
    , server = http.createServer(app)
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
require('./routes')(app, io);

// Start server
var port = process.env.PORT || 5001;

server.listen(port);

var Game = require(__base + "/model/game");
var chatService = require(__base + "/service/chat_service");
Game.find({
    status: {
        $in: [Game.status.PREPARED, Game.status.IN_PROGRESS]
    }
}).exec().then(function (games) {
    games.forEach(function (game) {
        console.log('Chats prepared for game: ' + game._id);
        console.log(chatService.prepareChats(io, game));
    });
});