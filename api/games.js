var Game = require(__base + "/model/game");

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
            if (count > 0){
                res.send(500, 'Team with code ' + team.code + ' already exist');
                return;
            }

            return Game.findByIdAndUpdate(
                req.body.gameId,
                {$push: {teams: team}},
                {upsert: true})
                .exec()
        }).then(function (game) {
            res.send({teamId: game.teams[game.teams.length - 1]._id});
        });
};