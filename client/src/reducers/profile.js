import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from "../actions/types";

// Actions to get profile, create it, update, clear from state, etc

const initialState = {
    profile: null,
    profiles: [], //list of devs
    repos: [], // github
    loading: true,
    error: {}
}

export default function(state = initialState, action){
    const { type, payload } = action;

    switch(type){
        case GET_PROFILE:
            return{
                ...state,
                profile: payload,
                loading: false
            };
        case PROFILE_ERROR:
            return{
                ...state,
                error: payload,
                loading: false
            };
        case CLEAR_PROFILE:
            return{
                ...state,
                profile: null,
                repos: [],
                loading: false
            };
        default:
            return state;
    }
}