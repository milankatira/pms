import { Dispatch } from 'redux';
import axios from '../../utils/axios';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';

// Register Action
export const register =
  (email: string, password: string, router: any) => async (dispatch: Dispatch) => {
    try {
      const res = await axios.post('/auth/register', { email, password });
      dispatch({ type: REGISTER_SUCCESS });
      router.push('/');
      // You can perform additional actions after a successful registration, such as redirecting the user or displaying a success message.
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error.response.data.error });
      // You can handle the error, such as displaying an error message to the user.
    }
  };

// Login Action
export const login =
  (email: string, password: string, router: any) => async (dispatch: Dispatch) => {
    try {
      const res = await axios.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      dispatch({ type: LOGIN_SUCCESS });
      // Router.push("/")
      router.push('/');
      // You can perform additional actions after a successful login, such as storing the token in local storage or redirecting the user.
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error?.response?.data?.error });
      // You can handle the error, such as displaying an error message to the user.
    }
  };

// Logout Action
export const logout = () => async (dispatch: Dispatch) => {
  try {
    await axios.post('/auth/logout');
    dispatch({ type: LOGOUT_SUCCESS });
    // You can perform additional actions after a successful logout, such as clearing the user data from the state or redirecting the user to the login page.
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: error.response.data.error });
    // You can handle the error, such as displaying an error message to the user.
  }
};
