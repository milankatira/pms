import axiosInstance from 'src/utils/axios';

// Action Types
export const FETCH_LOGS_REQUEST = 'FETCH_LOGS_REQUEST';
export const FETCH_LOGS_SUCCESS = 'FETCH_LOGS_SUCCESS';
export const FETCH_LOGS_FAILURE = 'FETCH_LOGS_FAILURE';
export const CREATE_LOG_REQUEST = 'CREATE_LOG_REQUEST';
export const CREATE_LOG_SUCCESS = 'CREATE_LOG_SUCCESS';
export const CREATE_LOG_FAILURE = 'CREATE_LOG_FAILURE';

export const EDIT_LOG_REQUEST = 'EDIT_LOG_REQUEST';
export const EDIT_LOG_SUCCESS = 'EDIT_LOG_SUCCESS';
export const EDIT_LOG_FAILURE = 'EDIT_LOG_FAILURE';
export const GET_LOG_REQUEST = 'GET_LOG_REQUEST';
export const GET_LOG_SUCCESS = 'GET_LOG_SUCCESS';
export const GET_LOG_FAILURE = 'GET_LOG_FAILURE';

// Action Creators
export const fetchLogsRequest = () => ({ type: FETCH_LOGS_REQUEST });

export const fetchLogsSuccess = (logs: any[]) => ({
  type: FETCH_LOGS_SUCCESS,
  payload: logs,
});

export const fetchLogsFailure = (error: string) => ({
  type: FETCH_LOGS_FAILURE,
  payload: error,
});

export const createLogRequest = () => ({ type: CREATE_LOG_REQUEST });

export const createLogSuccess = (log: any) => ({
  type: CREATE_LOG_SUCCESS,
  payload: log,
});

export const createLogFailure = (error: string) => ({
  type: CREATE_LOG_FAILURE,
  payload: error,
});

export const editLogRequest = () => ({ type: EDIT_LOG_REQUEST });

export const editLogSuccess = () => ({
  type: EDIT_LOG_SUCCESS,
});

export const editLogFailure = (error: string) => ({
  type: EDIT_LOG_FAILURE,
  payload: error,
});

export const getLogRequest = () => ({ type: GET_LOG_REQUEST });

export const getLogSuccess = (log: any) => ({
  type: GET_LOG_SUCCESS,
  payload: log,
});

export const getLogFailure = (error: string) => ({
  type: GET_LOG_FAILURE,
  payload: error,
});

// Thunk Action Creator
export const fetchLogs = () => async (dispatch: any) => {
  try {
    dispatch(fetchLogsRequest());

    const response = await axiosInstance.get('/logs'); // Update with your API endpoint

    dispatch(fetchLogsSuccess(response.data.logs));
  } catch (error) {
    dispatch(fetchLogsFailure(error.message));
  }
};

export const createLog = (logData: any) => async (dispatch: any) => {
  try {
    dispatch(createLogRequest());
    const response = await axiosInstance.post('/logs', logData);
    dispatch(createLogSuccess(response.data));
  } catch (error) {
    dispatch(createLogFailure(error.message));
  }
};

export const editLog = (logId: string, logData: any) => async (dispatch: any) => {
  try {
    dispatch(editLogRequest());
    await axiosInstance.put(`/logs/${logId}`, logData);
    dispatch(editLogSuccess());
  } catch (error) {
    dispatch(editLogFailure(error.message));
  }
};

export const getLog = (logId: string) => async (dispatch: any) => {
  try {
    dispatch(getLogRequest());
    const response = await axiosInstance.get(`/logs/${logId}`);
    dispatch(getLogSuccess(response.data));
  } catch (error) {
    dispatch(getLogFailure(error.message));
  }
};