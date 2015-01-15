var Chat = require(__base + "/model/chat");
// export function for listening to the socket
module.exports = function (teamId) {
    return function (socket) {
        // send the new user their name and a list of users
        var query = socket.request._query;
        var userName = query.username;
        if (!userName || userName.trim().length == 0) {
            socket.disconnect();
        }
        var lastMessageId = query.lastMessageId || 0;
        Chat.findOne({teamId: teamId}).exec().then(function (chat) {
            var messages;
            if (chat.messages.length <= lastMessageId) {
                messages = [];
            } else {
                messages = chat.messages.slice(lastMessageId);
            }

            socket.emit('init', {
                messages: messages
            });

            // broadcast a user's message to other users
            socket.on('send:message', function (data) {
                var message = {text: data.message, user: userName};
                Chat.update({_id: chat._id},
                    {
                        $push: {
                            messages: message
                        }
                    },
                    {upsert: true}
                ).exec().then(function () {
                        socket.broadcast.emit('send:message', message);
                    }
                );
            });

            // clean up when a user leaves, and broadcast it to other users
            socket.on('disconnect', function () {
                //
            });
        });


    }
};
