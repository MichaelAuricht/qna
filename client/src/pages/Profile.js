import React from "react";

import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import QuestionsList from "../components/QuestionsList";
import QuestionForm from "../components/QuestionForm";

import { QUERY_SINGLE_PROFILE, QUERY_ME, QUERY_MY_QUESTIONS, QUERY_QUESTIONS } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
  const { profileId } = useParams();
console.log("profileId", profileId);
  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(
    profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
    {
      variables: { profileId: profileId },
    }
  );
  const result = useQuery (
    profileId ? QUERY_QUESTIONS : QUERY_MY_QUESTIONS,
    {
      variables: { profileId: profileId },
    }
  )

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const profile = data?.me || data?.profile || {};

  // Use React Router's `<Navigate />` component to redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
    return <Navigate to="/me" />;
  }

  if (loading || result.loading) {
    return <div>Loading...</div>;
  }

  if (!profile?.name) {
    return (
      <h4>
        You need to be logged in to see your profile page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }
  const questions = result.data.questions || result.data.profile.questions || [];
  
  return (
    <div>
      <h2 className="card-header">
        {profileId ? `${profile.name} has` : "You have"} asked these
        questions...
      </h2>

      {questions.length > 0 && (
        <QuestionsList
          questions={questions}
          isLoggedInUser={!profileId && true}
        />
      )}

      <div className="my-4 p-4" style={{ border: "1px dotted #1a1a1a" }}>
        <QuestionForm profileId={profile._id} />
      </div>
    </div>
  );
};

export default Profile;