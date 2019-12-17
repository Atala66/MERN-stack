import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, CREATE_PROFILE } from '../actions/constants';

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE:
        case CREATE_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state;

    }
}