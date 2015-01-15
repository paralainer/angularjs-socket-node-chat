var Chat = require(__base + "/model/chat");
var Message = require(__base + "/model/message");
// export function for listening to the socket
module.exports = function (chatId) {
    return function (socket) {
        // send the new user their name and a list of users
        var query = socket.request._query;
        var username = query.username;
        if (!username || username.trim().length == 0) {
            socket.disconnect();
        }
        var lastMessageId = query.lastMessageId;
        Chat.findById(chatId).exec().then(function (chat) {
            var messageQuery;
            if (lastMessageId) {
                messageQuery = [];
            } else {
                messageQuery = Message.find({chatId: chat._id}).sort("timestamp");
            }

            return messageQuery.exec();
        }).then(function (messages) {
            socket.emit('init', {
                messages: messages
            });

            socket.on('send:message', function (data) {
                var message = {chatId: chatId, text: data.message, user: username};
                Message.create(message).then(function () {
                        socket.broadcast.emit('send:message', message);
                    }
                );
            });

            socket.on('disconnect', function () {
                //
            });
        });


    }
};
