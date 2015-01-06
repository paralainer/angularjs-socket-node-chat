var Game = require(__base + "/model/game");

exports.create = function (req, res) {
    Game.create(req.body)
        .then(function (game) {
            res.send({gameId: game._id});
        });
};

exports.addTeam = function (req, res) {
    Game.findById(req.body.gameId).exec(function (err, game) {
        game.teams.push(req.body.team);
        game.save(function () {
            res.send("success");
        });
    });

};