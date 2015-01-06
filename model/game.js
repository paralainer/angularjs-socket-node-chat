var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var GameSchema = new Schema({
    name: String,
    teams: [{
        name: String,
        code: String,
        tasksOrder: [Number],
        currentTime: Number,
        currentTask: {
            number: Number,
            name: String

        }
    }],
    tasks: [{
        name: String,
        type: String

    }]
});

module.exports = mongoose.model('Game', GameSchema);

