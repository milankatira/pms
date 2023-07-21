import { Dispatch } from 'redux';
import axios from '../../utils/axios';
import { PATH_DASHBOARD } from 'src/routes/paths';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';

export const FETCH_ME_REQUEST = 'FETCH_ME_REQUEST';
export const FETCH_ME_SUCCESS = 'FETCH_ME_SUCCESS';
export const FETCH_ME_FAILURE = 'FETCH_ME_FAILURE';

export const fetchMe = (router: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: FETCH_ME_REQUEST });
    const res = await axios.get('/auth/me');
    dispatch({ type: FETCH_ME_SUCCESS, payload: res.data });
    router.push('/dashboard/app');
  } catch (error) {
    dispatch({ type: FETCH_ME_FAILURE, payload: error?.response?.data?.error });
  }
};

export const register =
  (email: string, password: string, router: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: REGISTER_REQUEST });
      await axios.post('/auth/register', { email, password });
      dispatch({ type: REGISTER_SUCCESS });
      router.push('/');
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error.response.data.error });
    }
  };

export const login =
  (email: string, password: string, router: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
      const res = await axios.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      dispatch({ type: LOGIN_SUCCESS });
      router.push(PATH_DASHBOARD.blog.root);
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error?.response?.data?.error });
    }
  };

export const logout = () => async (dispatch: Dispatch) => {
  try {
    await axios.post('/auth/logout');
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: error.response.data.error });
  }
};
