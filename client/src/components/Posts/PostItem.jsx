import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addLikes, removeLikes, deletePost } from "../../actions/post";


const PostItem = ({
  addLikes, removeLikes, deletePost,
  auth,
  post: { _id, name, text, avatar, date, user, likes, unlikes, comments }
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
        <img src={avatar} alt="" className="round-img" />
        </Link>
        <h4>{name}</h4>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          {" "}
          Posted on: <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        <button type="button"  onClick={ e => addLikes(_id)}
        className="btn btn-light">
          <i className="fas fa-thumbs-up"></i>
          {likes && likes.length > 0 && <span>{likes.length}</span>}
        </button>
        <button type="button" onClick={ e => removeLikes(_id)}
        className="btn btn-light">
          <i className="fas fa-thumbs-down"></i>
          {unlikes && unlikes.length > 0 && <span>{unlikes.length}</span>}
        </button>
        <Link to={`/posts/${_id}`} className="btn btn-primary">
          Discussion{" "}
          {comments && comments.length > 0 && (
            <span className="comment-count">{comments.length}</span>
          )}
        </Link>
        {!auth.loading && user === auth.user._id && (
          <button type="button"
          onClick={ e => deletePost(_id)} className="btn btn-danger">
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLikes: PropTypes.func.isRequired,
  removeLikes: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {addLikes, removeLikes, deletePost})(PostItem);
