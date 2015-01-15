var Message = require(__base + "/model/message");
// export function for listening to the socket
module.exports = function (teamId) {
    return function (socket) {
        var query = socket.request._query;
        var username = query.username;
        var lastMessageId = query.lastMessageId;

        if (!username || username.trim().length == 0) {
            socket.disconnect();
        }

        var messageQuery = Message.where("teamId").equals(teamId);
        if (lastMessageId) {
            messageQuery.where("_id").gt(lastMessageId);
        }

        messageQuery.sort("timestamp").exec().then(function (messages) {
            socket.emit('init', {
                messages: messages
            });

            socket.on('send:message', function (data) {
                var message = {teamId: teamId, text: data.message, user: username};
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
