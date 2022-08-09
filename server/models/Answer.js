const { Schema, model } = require("mongoose");

const answerSchema = new Schema({
  answer: {
    type: String,
    trim: true,
  },
  score: {
    type: Number,
    trim: true,
  },
});

const Answer = model("Answer", answerSchema);

module.exports = Answer;
