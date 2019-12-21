import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

export const ProfileEducation = ({
  education: { school, degree, fieldofstudy,  current, from, to, description }
}) => {
  return (
    <div className="profile-exp bg-white p-2">
      <h3 className="text-dark">{school}</h3>
      <p className="text-dark">Dates:
        <Moment format="YYYY/M//DD">{from}</Moment> -{" "}
        {!to ? "Now" : <Moment format="YYYY/DD/MM">{to}</Moment>}
      </p>
      <p>
          <strong>Degree:</strong>{ degree }
      </p>
      <p>
          <strong>Field of study:</strong>{ fieldofstudy }
      </p>
      <p>
          <strong>Description:</strong>{ description }
      </p>
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired
};

export default ProfileEducation;
