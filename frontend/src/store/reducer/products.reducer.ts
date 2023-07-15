import {
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  EDIT_PROJECT_REQUEST,
  EDIT_PROJECT_SUCCESS,
  EDIT_PROJECT_FAILURE,
  GET_PROJECT_REQUEST,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_FAILURE,
  FETCH_ALL_PROJECTS_REQUEST,
  FETCH_ALL_PROJECTS_SUCCESS,
  FETCH_ALL_PROJECTS_FAILURE,
  FETCH_ALL_DASHBOARD_DATA_REQUEST, // Added import for the new action
  FETCH_ALL_DASHBOARD_DATA_SUCCESS, // Added import for the new action
  FETCH_ALL_DASHBOARD_DATA_FAILURE, // Added import for the new action
} from '../action/products.action';

const initialState = {
  projects: [],
  loading: false,
  error: null,
  project: null,
  projectList: null,
  dashboardData: null, // Added state for dashboard data
};

const projectReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_PROJECTS_REQUEST:
    case CREATE_PROJECT_REQUEST:
    case EDIT_PROJECT_REQUEST:
    case GET_PROJECT_REQUEST:
    case FETCH_ALL_PROJECTS_REQUEST:
    case FETCH_ALL_DASHBOARD_DATA_REQUEST: // Added case for fetching all dashboard data
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: action.payload,
      };
    case CREATE_PROJECT_SUCCESS:
    case EDIT_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case GET_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        project: action.payload,
      };
    case FETCH_PROJECTS_FAILURE:
    case CREATE_PROJECT_FAILURE:
    case EDIT_PROJECT_FAILURE:
    case GET_PROJECT_FAILURE:
    case FETCH_ALL_PROJECTS_FAILURE:
    case FETCH_ALL_DASHBOARD_DATA_FAILURE: // Added case for fetching all dashboard data
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_ALL_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        projectList: action.payload,
      };
    case FETCH_ALL_DASHBOARD_DATA_SUCCESS: // Added case for fetching all dashboard data
      return {
        ...state,
        loading: false,
        dashboardData: action.payload,
      };
    default:
      return state;
  }
};

export default projectReducer;
