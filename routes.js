
module.exports = function (app, io) {
    var games = require("./api/games");
    app.post('/api/game', games.create);
    app.post('/api/game/team', games.addTeam);

    var chats = require("./api/chats");
    app.get('/api/chat/room/:teamCode', chats.getChatRoom);
    app.post('/api/chat/prepare', chats.prepareChats(io));
};