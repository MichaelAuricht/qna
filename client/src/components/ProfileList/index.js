import React from "react";
import { Link } from "react-router-dom";

const ProfileList = ({ profiles, title }) => {
  if (!profiles.length) {
    return <h3>No Profiles Yet</h3>;
  }

  return (
    <div>
      <h3 className="text-primary">{title}</h3>
      <div className="flex-row justify-space-between my-4">
        {profiles &&
          profiles.map((profile) => {
            if (profile.questions.length) {
              return (
                <div key={profile._id} className="col-12 col-xl-6">
                  <div className="card mb-3">
                    <h4 className="card-header bg-dark text-light p-2 m-0">
                      {profile.name}'s <br />
                      <span className="text-white" style={{ fontSize: "1rem" }}>
                        most recent question is
                        <Link
                          className="btn btn-block btn-squared btn-light text-dark"
                          to={`/profiles/${profile._id}/question`}
                        >
                          {profile.questions[profile.questions.length - 1].question}
                        </Link>
                      </span>
                    </h4>

                    <Link
                      className="btn btn-block btn-squared btn-light text-dark"
                      to={`/profiles/${profile._id}`}
                    >
                      View all their questions.
                    </Link>
                  </div>
                </div>
              )
            }
          })}
      </div>
    </div>
  );
};

export default ProfileList;