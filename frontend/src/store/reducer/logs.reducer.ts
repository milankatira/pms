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
  FETCH_DASHBOARD_LOGS_REQUEST,
  FETCH_DASHBOARD_LOGS_SUCCESS,
  FETCH_DASHBOARD_LOGS_FAILURE,
  FETCH_DASHBOARD_TOTAL_DURATION_AND_LOG_COUNT_REQUEST,
  FETCH_DASHBOARD_TOTAL_DURATION_AND_LOG_COUNT_SUCCESS,
  FETCH_DASHBOARD_TOTAL_DURATION_AND_LOG_COUNT_FAILURE,
} from '../action/logs.action';

const initialState = {
  logs: [],
  loading: false,
  error: null,
  log: null,
  dashboardLogs: [],
  numberOfLogs: null,
  totalDuration: null,
  logCount: null,
  logAnalysis:null,
};

const logReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_LOGS_REQUEST:
    case CREATE_LOG_REQUEST:
    case EDIT_LOG_REQUEST:
    case GET_LOG_REQUEST:
    case FETCH_DASHBOARD_TOTAL_DURATION_AND_LOG_COUNT_REQUEST:
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
        numberOfLogs: action.numberOfLog,
      };
    case CREATE_LOG_SUCCESS:
    case EDIT_LOG_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case GET_LOG_SUCCESS:
      return {
        ...state,
        loading: false,
        log: action.payload,
      };
    case FETCH_LOGS_FAILURE:
    case CREATE_LOG_FAILURE:
    case EDIT_LOG_FAILURE:
    case GET_LOG_FAILURE:
    case FETCH_DASHBOARD_TOTAL_DURATION_AND_LOG_COUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_DASHBOARD_LOGS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_DASHBOARD_LOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        dashboardLogs: action.payload,
      };
    case FETCH_DASHBOARD_LOGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_DASHBOARD_TOTAL_DURATION_AND_LOG_COUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        totalDuration: action.payload[0].totalDuration,
        logCount: action.payload[0].totalLogs,
        logAnalysis: action.payload.slice(1),
      };

    default:
      return state;
  }
};

export default logReducer;
