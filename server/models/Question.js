const { Schema, model } = require("mongoose");

const questionSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },
  question: {
    type: String,
    trim: true,
  },
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
});

const Question = model("Question", questionSchema);

module.exports = Question;
