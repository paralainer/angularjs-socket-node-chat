
module.exports = function (app, io) {
    var games = require("./api/games");
    app.post('/api/game', games.create);
    app.post('/api/game/team', games.addTeam);
    app.post('/api/game/status', games.changeStatus(io));

    var chats = require("./api/chats");
    app.get('/api/chat/room/:teamCode', chats.getChatRoom);
};