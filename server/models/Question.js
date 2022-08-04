const { Schema, model } = require('mongoose');

const questionSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
});

const Question = model('Question', questionSchema);

model.exports = Question;