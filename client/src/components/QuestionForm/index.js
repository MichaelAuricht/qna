import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_QUESTION } from '../../utils/mutations';

import Auth from '../../utils/auth';

const QuestionForm = ({ profileId }) => {
  const [question, setQuestion] = useState('');

  const [addQuestion, { error }] = useMutation(ADD_QUESTION);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await addQuestion({
        variables: { profileId, question },
      });

      setQuestion('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h4>Want to ask or answer a question?</h4>

      {Auth.loggedIn() ? (
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}
        >
          <div className="col-12 col-lg-9">
            <input
              placeholder="Ask some questions..."
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
          You need to be logged in to ask questions. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default QuestionForm;
