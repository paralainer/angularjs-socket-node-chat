// Keep track of which names are used so that there are no duplicates
var messages = [];
var userNames = (function () {
    var names = {};

    var claim = function (name) {
        if (!name || names[name]) {
            return false;
        } else {
            names[name] = true;
            return true;
        }
    };

    // find the lowest unused "guest" name and claim it
    var getGuestName = function () {
        var name,
            nextUserId = 1;

        do {
            name = 'Guest' + nextUserId;
            nextUserId += 1;
        } while (!claim(name));

        return name;
    };

    // serialize claimed names as an array
    var get = function () {
        var res = [];
        for (var user in names) {
            res.push(user);
        }

        return res;
    };

    var free = function (name) {
        if (names[name]) {
            delete names[name];
        }
    };

    return {
        claim: claim,
        free: free,
        get: get,
        getGuestName: getGuestName
    };
}());

// export function for listening to the socket
module.exports = function (socket) {
    var name = userNames.getGuestName();

    // send the new user their name and a list of users
    socket.emit('init', {
        name: name,
        messages: messages
    });

    // broadcast a user's message to other users
    socket.on('send:message', function (data) {
        socket.to(data.room).broadcast.emit('send:message', {
            user: name,
            text: data.message
        });
        messages.push({text: data.message, name: name});
    });

    // clean up when a user leaves, and broadcast it to other users
    socket.on('disconnect', function () {
        userNames.free(name);
    });
};
