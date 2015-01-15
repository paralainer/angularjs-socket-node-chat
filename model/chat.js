var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ChatSchema = new Schema({
    teamId: Schema.Types.ObjectId,
    teamCode: String,
    gameId: Schema.Types.ObjectId
});

module.exports = mongoose.model('Chat', ChatSchema);

