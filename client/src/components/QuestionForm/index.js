import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_QUESTION } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

const QuestionForm = () => {
  const [question, setQuestion] = useState("");

  const [addQuestion, { error }] = useMutation(ADD_QUESTION , {
    update(cache, { data: { addQuestion } }) {
      try {
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: addQuestion },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await addQuestion({
        variables: { question },
      });
      // window.location.reload(false)  // filthy. quick and dirty way to get the list to update when we add a new question so it shows up
      setQuestion("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h4>Ask some more questions below.</h4>

      {Auth.loggedIn() ? (
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}
        >
          <div className="col-12 col-lg-9">
            <input
              placeholder="Ask something..."
              value={question}
              className="form-input w-100"
              onChange={(event) => setQuestion(event.target.value)}
            />
          </div>

          <div className="col-12 col-lg-3">
            <button className="btn btn-info btn-block py-3" type="submit">
              Ask Question
            </button>
          </div>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              {error.message}
            </div>
          )}
        </form>
      ) : (
        <p>
          You need to be logged in to ask questions. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default QuestionForm;