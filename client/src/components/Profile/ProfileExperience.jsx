import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

export const ProfileExperience = ({
  experience: { company, title, location, from, to, current, description }
}) => {
  return (
    <div className="profile-exp bg-white p-2">
      <h3 className="text-dark">{company}</h3>
      <p className="text-dark">Dates:
        <Moment format="YYYY/M//DD">{from}</Moment> -{" "}
        {!to ? "Now" : <Moment format="YYYY/DD/MM">{to}</Moment>}
      </p>
      <p>
          <strong>Position:</strong>{ title }
      </p>
      <p>
          <strong>Description:</strong>{ description }
      </p>
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired
};

export default ProfileExperience;
