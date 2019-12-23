import { GET_POSTS, GET_POST, POST_ERROR } from '../actions/constants';

const intialState = {
    post: null,
    posts: [],
    loading: true,
    error: {}
}

export default function(state = intialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            }
        case GET_POST:
            return {
                ...state,
                post: action.payload,
                loading: false
            }
        case POST_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state;
    }
}