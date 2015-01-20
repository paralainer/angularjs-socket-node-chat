var Game = require(__base + "/model/game");
var chatService = require(__base + "/service/chat_service");

exports.create = function (req, res) {
    Game.create(req.body)
        .then(function (game) {
            res.send({gameId: game._id});
        });
};

exports.addTeam = function (req, res) {
    var team = req.body.team;
    Game.count(
        {
            teams: {
                $elemMatch: {code: team.code}
            }
        })
        .exec()
        .then(function (count) {
            if (count > 0) {
                res.send(500, 'Team with code ' + team.code + ' already exist');
                return;
            }

            return Game.findByIdAndUpdate(
                req.body.gameId,
                {$push: {teams: team}},
                {upsert: true})
                .exec()
        })
        .then(function (game) {
            res.send({teamId: game.teams[game.teams.length - 1]._id});
        });
};

exports.changeStatus = function (io) {
    return function (req, res) {
        if (!Game.status[req.body.status.toUpperCase()]) {
            res.send(500, 'Unknown status: ' + req.body.status);
        }

        Game.findByIdAndUpdate(
            req.body.gameId,
            {status: req.body.status},
            {upsert: true})
            .exec().then(function (game) {
                res.send(chatService.prepareChats(io, game));
            });
    }
};