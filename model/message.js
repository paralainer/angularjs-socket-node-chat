var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MessageSchema = new Schema({
    teamId: Schema.Types.ObjectId,
    text: String,
    user: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Message', MessageSchema);

