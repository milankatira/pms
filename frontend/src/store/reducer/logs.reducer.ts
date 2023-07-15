import {
  FETCH_LOGS_REQUEST,
  FETCH_LOGS_SUCCESS,
  FETCH_LOGS_FAILURE,
  CREATE_LOG_REQUEST,
  CREATE_LOG_SUCCESS,
  CREATE_LOG_FAILURE,
  EDIT_LOG_REQUEST,
  EDIT_LOG_SUCCESS,
  EDIT_LOG_FAILURE,
  GET_LOG_REQUEST,
  GET_LOG_SUCCESS,
  GET_LOG_FAILURE,
} from '../action/logs.action';

const initialState = {
  logs: [],
  loading: false,
  error: null,
  log: null,
};

const logReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_LOGS_REQUEST:
    case CREATE_LOG_REQUEST:
    case EDIT_LOG_REQUEST:
    case GET_LOG_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_LOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        logs: action.payload,
      };
    case CREATE_LOG_SUCCESS:
    case EDIT_LOG_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case GET_LOG_SUCCESS:
      console.log(action.payload, 'action.payload');
      return {
        ...state,
        loading: false,
        log: action.payload,
      };
    case FETCH_LOGS_FAILURE:
    case CREATE_LOG_FAILURE:
    case EDIT_LOG_FAILURE:
    case GET_LOG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default logReducer;
