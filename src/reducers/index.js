import {LOGOUT, RESET, LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, SUBMIT_START, SUBMIT_SUCCESS, SUBMIT_FAIL} from '../actions'
import Auth from '../Auth'
const auth = new Auth();
const initialState = {
    users: [],
    isLoggingIn: false,
    error: false,
    isLoading: false,
    pending: false,
    submitFail: false,
    credentials: [],
    newUser: false,
    user: {},
    loggedIn: false,
    auth

  // Array characters, Boolean fetching, null error.
};

    // Array characters, Boolean fetching, null error.
  };
 
  export const rootReducer = (state=initialState, action)=> {
    switch (action.type) {
       
        case LOGIN_START:
            return {
                ...state,
                loggingIn: true,
                newUser: false
            }
        case LOGIN_SUCCESS:
        return {
            ...state,
            loggingIn: false,
            credentials: action.payload,
            user: action.payload,
            loggedIn: true
            
        }
        case LOGIN_FAIL:
        return {
            ...state,
            loggingIn: false,
            error: true,
            pending: false
        }

        case SUBMIT_START:
            return {
            ...state,
            isLoading: true,
            submitFail: false,
            auth
            }
            case SUBMIT_FAIL:
            return {
            ...state,
            isLoading: false,
            submitFail: true,
            error: true
            }

    case LOGOUT:
      return {
        ...initialState,
      };

    case RESET:
      return {
        ...state,
        newUser: false,
        error: false,
        user: {},
        loggedIn: false,
      };

    default:
      return state;
  }
};
