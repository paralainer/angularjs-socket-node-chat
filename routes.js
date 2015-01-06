var games = require("./api/game/games");
module.exports = function (app) {
    app.post('/api/game', games.create);
    app.post('/api/game/team', games.addTeam);
};