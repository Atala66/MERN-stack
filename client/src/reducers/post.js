import { GET_POSTS, GET_POST, ADD_NEW_POST, ADD_LIKES, REMOVE_LIKES, POST_ERROR, DELETE_POST } from '../actions/constants';

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
        case ADD_NEW_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
                loading: false
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload),
                loading: false
            }
        case ADD_LIKES:
            return {
                ...state,
                posts: state.posts.map(post => post._id === action.payload.id ? {...post, likes: action.payload.likes } : post),
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