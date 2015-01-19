var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var GameSchema = new Schema({
    name: String,
    status: String,
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

GameSchema.index({"teams.code": 1}, {unique: true});
GameSchema.index({"status": 1});

module.exports = mongoose.model('Game', GameSchema);

module.exports.status = {
    NEW: 'new',
    PREPARED: 'prepared',
    IN_PROGRESS: 'in_progress',
    ENDED: 'ended'
};

