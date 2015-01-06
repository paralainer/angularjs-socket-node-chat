var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var GameSchema = new Schema({
    name: String,
    teams: [{
        name: String,
        code: String,
        tasksOrder: [String],
        currentTime: Number,
        currentTask: {
            taskId: String,
            name: String,
            subTaskIndex: Number
        }
    }],
    tasks: [{
        name: String,
        timeLimit: String,
        subTasks: [
            {
                name: String,
                type: String,
                text: String,
                config: Schema.Types.Mixed
            }
        ]
    }]
});

module.exports = mongoose.model('Game', GameSchema);

