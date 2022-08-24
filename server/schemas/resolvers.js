const { AuthenticationError } = require("apollo-server-express");
const { Profile, Question, Answer } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    profiles: async () => {
       return Profile.find().populate('questions').populate('answers');;
    },

    profile: async (parent, { profileId }) => {
      const result = Profile.findOne({ _id: profileId }).populate('questions').populate('answers');

      return result;
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {

        return Profile.findOne({ _id: context.user._id }).populate("questions");
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    questions: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      const profile = await Profile.findOne({ _id: context.user._id }).populate("questions").populate("answers");
      return profile.questions;
    },

    answers: async () => {
      return Answer.find();
    },

    oneQuestion: async (parent, { questionId }) => {
      return Question.findOne({ _id: questionId }).populate("answers");
    }


  },

  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError("No profile with this email found!");
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(profile);
      return { token, profile };
    },

    // Add a third argument to the resolver to access data in our `context`
    addQuestion: async (parent, { question }, context) => {
      // die if no user
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      const questionObj = await Question.create({ question });
      const profile = await Profile.findOne({ _id: context.user._id });
      profile.questions.push(questionObj);
      profile.save();
      return questionObj;
    },
    // Make it so a logged in user can only remove a question from their own profile
    removeQuestion: async (parent, { questionId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      const deletedQuestion = Question.findOneAndDelete({ _id: questionId });
      return deletedQuestion;
    },
  },
};

module.exports = resolvers;