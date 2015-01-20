var Game = require(__base + "/model/game");
var chatService = require(__base + "/service/chat_service");

exports.getChatRoom = function (req, res) {
    var teamCode = req.params.teamCode;
    res.send({roomId: chatService.getChatRoom(teamCode)});
};
