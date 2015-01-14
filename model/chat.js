var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ChatSchema = new Schema({
    teamId: Schema.Types.ObjectId,
    gameId: Schema.Types.ObjectId,
    messages:[{
        timestamp: Number,
        user: String,
        text: String
    }]
});

module.exports = mongoose.model('Chat', ChatSchema);

