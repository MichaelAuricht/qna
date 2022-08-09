const db = require("../config/connection");
const { Profile, Question, Answer } = require("../models");
const profileSeeds = require("./profileSeeds.json");
const questionSeeds = require("./questionSeeds.json");
const answerSeeds = require("./answerSeeds.json");

db.once("open", async () => {
  try {
    //clean database
    await Profile.deleteMany({});
    await Question.deleteMany({});
    await Answer.deleteMany({});

    //bulk create each model
    const profiles = await Profile.insertMany(profileSeeds);
    const questions = await Question.insertMany(questionSeeds);
    const answers = await Answer.insertMany(answerSeeds);

    for (newQ of questions) {
      // randomly add a question to a profile
      const tempProfile = profiles[Math.floor(Math.random() * profiles.length)];
      tempProfile.questions.push(newQ._id);
      await tempProfile.save();

      // randomly add an answer to a question
      const tempAnswer = answers[Math.floor(Math.random() * answers.length)];
      newQ.tempAnswer = tempAnswer._id;
      await newQ.save();
    }

    for (newAnswer of answers) {
      // reference answers on profile model too
      const tempProfile = profiles[Math.floor(Math.random() * profiles.length)];
      tempProfile.answers.push(newAnswer._id);
      await tempProfile.save();
    }

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
