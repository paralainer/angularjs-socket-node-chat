var request = require('request');
function url(api) {
    return 'http://localhost:5001' + api;
}

var API_CALLS = [
    {
        url: '/api/game',
        method: 'post',
        params: function () {
            return {name: 'testGame'}
        },
        callback: function (json) {
            console.log('Created game with id: ' + json.gameId);
        }
    },
    {
        url: '/api/game/team',
        method: 'post',
        params: function (data) {
            return {team: {name: 'testTeam', code: 'testCodeAbC'}, gameId: data[0].gameId};
        },
        callback: function (json) {
            console.log('Created team with id: ' + json.teamId);
        }
    },
    {
        url: '/api/chat/room/testCodeAbC',
        method: 'get',
        callback: function (json) {
            console.log('RoomId is: ' + json.roomId);
        }
    },
    {
        url: '/api/chat/prepare',
        method: 'post',
        params: function(data){
            return {gameId: data[0].gameId}
        },
        callback: function (json) {
            console.log('Chats prepared');
            console.log(json);
        }
    }
];

function callApi(index, data) {
    if (index >= API_CALLS.length) {
        return;
    }
    var apiCall = API_CALLS[index];
    console.log('\nCalling api: ' + apiCall.method + ' ' + apiCall.url);
    var params = apiCall.params && apiCall.params(data);
    if (!params){
        params = true;
    }

    var uri = url(apiCall.url);
    request[apiCall.method.toLowerCase()](uri, {json: params}, function (err, res, body) {
        if (err) {
            console.log(err);
            return;
        }
        if (res.statusCode != 200){
            console.log("Error: ");
            console.log(body);
            return;
        }

        if (apiCall.callback(body, err, res) === false) {
            return;
        }
        data.push(body);
        callApi(++index, data);
    });
}

callApi(0, []);


