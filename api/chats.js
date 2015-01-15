var Game = require(__base + "/model/game");
var Chat = require(__base + "/model/chat");
var chatSocket = require(__base + "/socket/chat_socket");

exports.getChatRoom = function (req, res) {
    var teamCode = req.params.teamCode;
    res.send({roomId: getChatRoom(teamCode)});
};

/**
 * creates chat rooms
 */
exports.prepareChats = function (io) {
    return function (req, res) {
        var gameId = req.body.gameId;
        Game.findById(gameId)
            .exec()
            .then(function (game) {
                var chats = [];
                game.teams.forEach(function (team) {
                    chats.push({
                        gameId: game._id,
                        teamId: team._id,
                        teamCode: team.code
                    });
                });
                return Chat.collection.insert(chats, function(err, chats){
                    if (err){
                        res.send(500, err);
                        return;
                    }
                    chats.forEach(function (chat) {
                        io.of(
                            '/' + getChatRoom(chat.teamCode)
                        ).on('connection', chatSocket(chat._id));
                    });
                    res.send(chats);
                });
            });
    }
};


function getChatRoom(teamCode) {
    var crypto = require('crypto');
    return crypto.createHash('md5').update(teamCode).digest("hex");
}
