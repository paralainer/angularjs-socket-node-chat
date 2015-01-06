var request = require('request');
function url(api) {
    return 'http://localhost:5001' + api;
}
function to_json(jsonString) {
    return JSON.parse(jsonString);
}

var api_calls = [
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
            return {team: {name: 'testTeam', code: 'testCodeAbC'}, gameId: data.gameId};
        },
        callback: function (json) {
            console.log('Created team with id: ' + json.teamId);
        }
    }

];

function callApi(index, data) {
    if (index >= api_calls.length) {
        return;
    }
    var api_call = api_calls[index];
    console.log('Calling api: ' + api_call.url + ', method ' + api_call.method);
    var params = api_call.params(data);

    var uri = url(api_call.url);
    request[api_call.method](uri, {json: params}, function (err, res, body) {
        if (err) {
            console.log(err);
            return;
        }
        api_call.callback(body, err, res);
        callApi(++index, body);
    });
}

callApi(0, {});


