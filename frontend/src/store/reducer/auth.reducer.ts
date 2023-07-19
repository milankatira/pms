import { Reducer } from 'redux';
import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  AUTH_ERROR,
  FETCH_ME_REQUEST,
  FETCH_ME_SUCCESS,
  FETCH_ME_FAILURE,
} from '../action/auth.action';

interface AuthState {
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  user: any; // Replace 'any' with the actual type of your user data
}

interface AuthAction {
  type: string;
  payload?: string | any; // Replace 'any' with the actual type of your payload
}

const initialState: AuthState = {
  isAuthenticated: false,
  error: null,
  isLoading: false,
  user: null,
};

const authReducer: Reducer<AuthState, AuthAction> = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        error: null,
        isLoading: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        error: null,
        user: null,
        isLoading: false,
      };
    case AUTH_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload || null,
        user: null,
        isLoading: false,
      };
    case FETCH_ME_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_ME_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        user: action.payload,
      };
    case FETCH_ME_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload || null,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
