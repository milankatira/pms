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
} from '../action/products.action';

const initialState = {
  projects: [],
  loading: false,
  error: null,
  project: null,
  projectList: null,
};

const projectReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_PROJECTS_REQUEST:
    case CREATE_PROJECT_REQUEST:
    case EDIT_PROJECT_REQUEST:
    case GET_PROJECT_REQUEST:
    case FETCH_ALL_PROJECTS_REQUEST: // Added case for fetching all projects
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
    default:
      return state;
  }
};

export default projectReducer;
