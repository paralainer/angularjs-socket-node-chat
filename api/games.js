var Game = require(__base + "/model/game");

exports.create = function (req, res) {
    Game.create(req.body)
        .then(function (game) {
            res.send({gameId: game._id});
        });
};

exports.addTeam = function (req, res) {
    var team = req.body.team;
    Game.findByIdAndUpdate(
        req.body.gameId,
        {$push: {teams: team}},
        {upsert: true})
        .exec()
        .then(function (game) {
            res.send({teamId: game.teams[game.teams.length - 1]._id});
        });
};