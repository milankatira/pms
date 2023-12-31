import axiosInstance from 'src/utils/axios';

// Action Types
export const FETCH_PROJECTS_REQUEST = 'FETCH_PROJECTS_REQUEST';
export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS';
export const FETCH_PROJECTS_FAILURE = 'FETCH_PROJECTS_FAILURE';

export const CREATE_PROJECT_REQUEST = 'CREATE_PROJECT_REQUEST';
export const CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS';
export const CREATE_PROJECT_FAILURE = 'CREATE_PROJECT_FAILURE';

export const EDIT_PROJECT_REQUEST = 'EDIT_PROJECT_REQUEST';
export const EDIT_PROJECT_SUCCESS = 'EDIT_PROJECT_SUCCESS';
export const EDIT_PROJECT_FAILURE = 'EDIT_PROJECT_FAILURE';

export const GET_PROJECT_REQUEST = 'GET_PROJECT_REQUEST';
export const GET_PROJECT_SUCCESS = 'GET_PROJECT_SUCCESS';
export const GET_PROJECT_FAILURE = 'GET_PROJECT_FAILURE';

export const FETCH_ALL_PROJECTS_REQUEST = 'FETCH_ALL_PROJECTS_REQUEST';
export const FETCH_ALL_PROJECTS_SUCCESS = 'FETCH_ALL_PROJECTS_SUCCESS';
export const FETCH_ALL_PROJECTS_FAILURE = 'FETCH_ALL_PROJECTS_FAILURE';

export const FETCH_ALL_DASHBOARD_DATA_REQUEST = 'FETCH_ALL_DASHBOARD_DATA_REQUEST';
export const FETCH_ALL_DASHBOARD_DATA_SUCCESS = 'FETCH_ALL_DASHBOARD_DATA_SUCCESS';
export const FETCH_ALL_DASHBOARD_DATA_FAILURE = 'FETCH_ALL_DASHBOARD_DATA_FAILURE';

// Action Creators
export const fetchProjectsRequest = () => ({ type: FETCH_PROJECTS_REQUEST });

export const fetchProjectsSuccess = (projects: any[]) => ({
  type: FETCH_PROJECTS_SUCCESS,
  payload: projects,
});

export const fetchProjectsFailure = (error: string) => ({
  type: FETCH_PROJECTS_FAILURE,
  payload: error,
});

export const createProjectRequest = () => ({ type: CREATE_PROJECT_REQUEST });

export const createProjectSuccess = (project: any) => ({
  type: CREATE_PROJECT_SUCCESS,
  payload: project,
});

export const createProjectFailure = (error: string) => ({
  type: CREATE_PROJECT_FAILURE,
  payload: error,
});

export const editProjectRequest = () => ({ type: EDIT_PROJECT_REQUEST });

export const editProjectSuccess = () => ({
  type: EDIT_PROJECT_SUCCESS,
});

export const editProjectFailure = (error: string) => ({
  type: EDIT_PROJECT_FAILURE,
  payload: error,
});

export const getProjectRequest = () => ({ type: GET_PROJECT_REQUEST });

export const getProjectSuccess = (project: any) => ({
  type: GET_PROJECT_SUCCESS,
  payload: project,
});

export const getProjectFailure = (error: string) => ({
  type: GET_PROJECT_FAILURE,
  payload: error,
});

export const fetchAllProjectsRequest = () => ({ type: FETCH_ALL_PROJECTS_REQUEST });

export const fetchAllProjectsSuccess = (projects: any[]) => ({
  type: FETCH_ALL_PROJECTS_SUCCESS,
  payload: projects,
});

export const fetchAllProjectsFailure = (error: string) => ({
  type: FETCH_ALL_PROJECTS_FAILURE,
  payload: error,
});

export const fetchAllDashboardDataRequest = () => ({
  type: FETCH_ALL_DASHBOARD_DATA_REQUEST,
});

export const fetchAllDashboardDataSuccess = (dashboardData: any[]) => ({
  type: FETCH_ALL_DASHBOARD_DATA_SUCCESS,
  payload: dashboardData,
});

export const fetchAllDashboardDataFailure = (error: string) => ({
  type: FETCH_ALL_DASHBOARD_DATA_FAILURE,
  payload: error,
});

export const fetchAllProjects = () => async (dispatch: any) => {
  try {
    dispatch(fetchAllProjectsRequest());

    const response = await axiosInstance.get('/projects/all'); // Update with the correct API endpoint for fetching all projects

    dispatch(fetchAllProjectsSuccess(response.data.projects));
  } catch (error) {
    dispatch(fetchAllProjectsFailure(error.message));
  }
};

// Thunk Action Creator
export const fetchProjects = () => async (dispatch: any) => {
  try {
    dispatch(fetchProjectsRequest());

    const response = await axiosInstance.get('/projects'); // Update with your API endpoint

    dispatch(fetchProjectsSuccess(response.data.projects));
  } catch (error) {
    dispatch(fetchProjectsFailure(error.message));
  }
};

export const createProject = (projectData: any) => async (dispatch: any) => {
  try {
    dispatch(createProjectRequest());
    const response = await axiosInstance.post('/projects', projectData);
    dispatch(createProjectSuccess(response.data));
  } catch (error) {
    dispatch(createProjectFailure(error.message));
  }
};

export const editProject = (projectId: string, projectData: any) => async (dispatch: any) => {
  try {
    dispatch(editProjectRequest());
    await axiosInstance.put(`/projects/${projectId}`, projectData);
    dispatch(editProjectSuccess());
  } catch (error) {
    dispatch(editProjectFailure(error.message));
  }
};

export const getProject = (projectId: string) => async (dispatch: any) => {
  try {
    dispatch(getProjectRequest());
    const response = await axiosInstance.get(`/projects/${projectId}`);
    dispatch(getProjectSuccess(response.data));
  } catch (error) {
    dispatch(getProjectFailure(error.message));
  }
};

export const fetchAllDashboardData = () => async (dispatch: any) => {
  try {
    dispatch(fetchAllDashboardDataRequest());

    const response = await axiosInstance.get('/projects/dashboard/all'); // Update with the correct API endpoint for fetching all dashboard data

    dispatch(fetchAllDashboardDataSuccess(response.data.project));
  } catch (error) {
    dispatch(fetchAllDashboardDataFailure(error.message));
  }
};
