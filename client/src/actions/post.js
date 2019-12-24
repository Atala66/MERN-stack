import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, GET_POST, ADD_LIKES, ADD_NEW_POST, REMOVE_LIKES, POST_ERROR, DELETE_POST } from './constants';

// get posts
export const getPosts = () => async dispatch => {
        try {
            const res = await axios.get('/api/posts');
            dispatch({
                type: GET_POSTS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });

        }
    }
    // get post
export const getPostById = post_id => async dispatch => {
        try {
            const res = await axios.get(`/api/posts/${post_id}`);
            dispatch({
                type: GET_POST,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });

        }
    }
    // add likes to a post
export const addLikes = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${id}`);
        dispatch({
            type: ADD_LIKES,
            payload: { id, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}

// // remove likes to a post
export const removeLikes = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`);
        dispatch({
            type: REMOVE_LIKES,
            payload: { id, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}

// // add New Post
export const addNewPost = formData => async dispatch => {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' }
        }
        const res = await axios.post('/api/posts', formData, config);
        dispatch({
            type: ADD_NEW_POST,
            payload: res.data
        });
        dispatch(setAlert('New Post created', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}

// // delete post
export const deletePost = id => async dispatch => {
    try {
        const res = await axios.delete(`api/posts/${id}`);
        dispatch({
            type: DELETE_POST,
            payload: id
        });
        dispatch(setAlert('Post has been deleted', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}