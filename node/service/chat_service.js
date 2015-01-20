var chatSocket = require(__base + "/socket/chat_socket");

/**
 * creates chat rooms
 */
exports.prepareChats = function (io, game) {
    var chats = [];
    game.teams.forEach(function (team) {
        var chatRoom = getChatRoom(team.code);
        io.of(
            '/' + chatRoom
        ).on('connection', chatSocket(team._id));

        var chatDesc = {};
        chatDesc[team.code] = chatRoom;
        chats.push(chatDesc);
    });
    return chats;
};

function getChatRoom(teamCode) {
    var crypto = require('crypto');
    return crypto.createHash('md5').update(teamCode).digest("hex");
}

exports.getChatRoom = getChatRoom;
