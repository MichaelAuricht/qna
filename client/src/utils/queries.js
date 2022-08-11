import { gql } from "@apollo/client";

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      questions {
        question
      }
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      questions {
        question
      }
    }
  }
`;

export const QUERY_MY_QUESTIONS = gql`
  query myQuestions {
    questions {
      _id
      question
      answers {
        answer
      }
    }
  }
`;