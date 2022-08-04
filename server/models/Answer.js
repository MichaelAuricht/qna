const { Schema, model } = require('mongoose');

const answerSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
});

const Answer = model('Answer', answerSchema);

model.exports = Answer;