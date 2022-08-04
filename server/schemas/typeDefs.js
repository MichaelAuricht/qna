const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    questions: [Question]
    answers: [Answer]
  }

  type Question {
    _id: ID
    name: String
  }

  type Answer {
    _id: ID
    name: String
    question: Question
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
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addQuestion(profileId: ID!, question: String!): Profile
    addAnswer(profileId: ID!, questionId: ID!, answer: String!): Profile
    removeProfile: Profile
    removeQuestion(question: String!): Profile
  }
`;

module.exports = typeDefs;
