import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE, GET_PROFILES, GET_REPOS } from "../actions/types";

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
        case UPDATE_PROFILE:
            return{
                ...state,
                profile: payload,
                loading: false
            };
            // fill empty profile arrary with profiles from the server
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            }
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
        case GET_REPOS:
            return {
                ...state,
                repos: payload,
                loading: false
            }
        default:
            return state;
    }
}