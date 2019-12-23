import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../Layout/Spinner";
import  PostItem  from "./PostItem";
import { getPosts } from "../../actions/post";


const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
   return loading ? (
  <Spinner/>
   ): (
    <Fragment>
      <h1>Posts</h1>
      <div className="posts">
        { posts.map(post =>(
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
   )
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
