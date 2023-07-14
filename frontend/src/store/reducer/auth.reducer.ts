import { Reducer } from 'redux';
import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS, AUTH_ERROR } from '../action/auth.action';

interface AuthState {
  isAuthenticated: boolean;
  error: string | null;
}

interface AuthAction {
  type: string;
  payload?: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  error: null,
};

const authReducer: Reducer<AuthState, AuthAction> = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        error: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        error: null,
      };
    case AUTH_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload || null,
      };
    default:
      return state;
  }
};

export default authReducer;
