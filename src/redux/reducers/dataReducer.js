import { SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, LOADING_DATA, LOADING_USER, DELETE_SCREAM, POST_SCREAM } from '../types';

const initialState = {
    screams:[],
    scream: {},
    loading: false
};

export default function(state = initialState, action){
    switch(action.type){
        case LOADING_DATA:
            return{
                ...state,
                loading: true
            }
        case SET_SCREAMS:
            return{
                ...state,
                screams: action.payload,
                loading: false  
            }    
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            let index = state.screams.findIndex(
                (scream) => scream.screamId === action.payload.screamId);
            state.screams[index] = action.payload;
            return{
                ...state
            }   
        case DELETE_SCREAM:
            // erase from state to dont make another reload to obtain the actual state of the screams after erase one
            index = state.screams.findIndex(
                (scream) => scream.screamId === action.payload 
            );
            state.screams.splice(index, 1);
            return {
                ...state
            }
        case POST_SCREAM:
            return{
                ...state,
                screams: [
                    action.payload,
                    ...state.screams
                ]
            }    
        default:
            return state;
    }
}