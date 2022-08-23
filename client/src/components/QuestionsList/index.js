import React from "react";
import { useMutation } from "@apollo/client";

import { REMOVE_QUESTION } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";

const QuestionsList = ({ questions, isLoggedInUser = false }) => {

  const [removeQuestion, { error }] = useMutation(REMOVE_QUESTION, {
    update(cache, { data: { removeQuestion } }) {
      try {
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: removeQuestion },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleRemoveQuestion = async (question) => {
    try {
      const id = question._id;
      await removeQuestion({
        variables: { questionId: id },
      });
      window.location.reload(false) // quick and dirty way to get the list to update when we delete a question
    } catch (err) {
      console.error(err);
    }
  };

  if (!questions.length) {
    return <h3>No Questions Yet</h3>;
  }

  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        {questions &&
          questions.map((question) => (
            <div key={question._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0 display-flex align-center">
                  <span>{question.question}</span>
                  {isLoggedInUser && (
                    <button
                      className="btn btn-sm btn-danger ml-auto"
                      onClick={() => handleRemoveQuestion(question)}
                    >
                      X
                    </button>
                  )}
                </h4>
              </div>
            </div>
          ))}
      </div>
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
};

export default QuestionsList;