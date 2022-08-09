const { gql } = require("apollo-server-express");

const typeDefs = gql`
enum VoteType {
  UPVOTE
  DOWNVOTE
}

type Profile {
    _id: ID!
    name: String!
    email: String!
    password: String!
    questions: [Question]
    answers: [Answer]
  }

  type Question {
    _id: ID!
    author: [Profile]
    question: String
    answers: [Answer]
  }

  type Answer {
    _id: ID
    answer: String
    score: Int
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: Profile
    questions: [Question]!
    answers: [Answer]!
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addQuestion(question: String!): Question!
    removeQuestion(quesId: ID!): ID!

    addAnswer(quesId: ID!, answer: String!): Answer!
    removeAnswer(quesId: ID!, ansId: ID!): ID!

    voteAnswer(quesId: ID!, ansId: ID!, voteType: VoteType!): Answer!
  }
`;

module.exports = typeDefs;
