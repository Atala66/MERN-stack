import React, { Fragment } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Education = ({ education }) => {
  const educations = education.map(educ => (
    <tr key={educ._id}>
      <td>{educ.school}</td>
      <td className="hide-sm">{educ.degree}</td>
      <td>
        <Moment format="YYYY/MM/DD">{educ.from}</Moment> -
        {educ.to === null ? (
          "Now"
        ) : (
          <Moment format="YYYY/MM/DD">{educ.to}</Moment>
        )}
      </td>
      <td>
        <button className="btn btn-danger">Delete</button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
    education: PropTypes.array.isRequired
};

export default Education;
