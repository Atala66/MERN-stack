import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//  import { getPostById } from "../../actions/post";

const PostItem = ({
    post: { name,text,avatar }
  }) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <img src={avatar} alt="" className="round-img" />
          <h4>{name}</h4>
      </div>
       <div>{ text }</div>
      {/* <div>
        <p className="my-1">
            {  text }
        </p>
  <p className="post-date"> {  date }</p>
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-up"></i>
          <span>4</span>
        </button>
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-down"></i>
        </button>
        <a href="post.html" className="btn btn-primary">
          Discussion <span className="comment-count">2</span>
        </a>
        <button type="button" className="btn btn-danger">
          <i className="fas fa-times"></i>
        </button>
      </div> */}
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired
};


export default PostItem;
