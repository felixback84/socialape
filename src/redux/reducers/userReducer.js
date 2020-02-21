 // user actions
import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    MARK_NOTIFICATIONS_READ,
    SET_AUTHENTICATED,
    LIKE_SCREAM,
    UNLIKE_SCREAM
} from '../types';


// initial state
const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: []
};

// function to determine the type of action to set state
export default function(state = initialState, action){
    switch(action.type){
        case SET_AUTHENTICATED:
            return{
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            };  
        case LOADING_USER:
            return {
                ...state,
                loading: true
            };    
        case LIKE_SCREAM:
            return{
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        screamId: action.payload.screamId
                    }
                ]
            }
        case UNLIKE_SCREAM:    
            return {
                ...state,
                likes: state.likes.filter(
                    like => like.screamId === action.payload.screamId
                )
            }
        default:
            return state;  
    }
} 