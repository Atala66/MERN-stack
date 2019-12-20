import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// import Spinner from "../Layout/Spinner";
// import { getProfiles } from "../../actions/profile";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
  }
}) => {
  return (
    <div className="profile bg-light">
      <img src={avatar} alt="" className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span>at {company}</span>}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary" />
        View Profile
      </div>
      <ul>
        {skills.slice(0.6).map((skill, index) => (
          <li key={index} className="text-primary">
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

// const mapStateToProps = state => ({
//   profile: state.profile
// });

export default ProfileItem;
