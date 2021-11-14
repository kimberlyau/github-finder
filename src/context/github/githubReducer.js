/* Manages state based on what is passed in */
import {
    SEARCH_USERS,
    GET_USER,
    CLEAR_USERS,
    GET_REPOS,
    SET_LOADING,
} from '../types';

const githubReducer = (state, action) => {
    switch (action.type) {
        case SEARCH_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false,
            };
        case CLEAR_USERS:
            return {
                ...state,
                users: [],
                loading: false,
            };
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                loading: false,
            };
        case GET_REPOS:
            return {
                ...state,
                repos: action.payload,
                loading: false,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};

/* Issue: Assign arrow function to a variable before exporting as module default import/no-anonymous-default-export
 * https://dev.to/tmenyhart/comment/195kp
 */
export default githubReducer;
