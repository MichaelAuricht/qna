import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_QUESTION = gql`
  mutation addQuestion($profileId: ID!, $question: String!) {
    addQuestion(profileId: $profileId, question: $question) {
      _id
      name
      questions
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const REMOVE_QUESTION = gql`
  mutation removeQuestion($question: String!) {
    removeQuestion(question: $question) {
      _id
      name
      questions
    }
  }
`;
