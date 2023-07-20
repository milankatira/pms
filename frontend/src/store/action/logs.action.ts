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

export const FETCH_DASHBOARD_LOGS_REQUEST = 'FETCH_DASHBOARD_LOGS_REQUEST';
export const FETCH_DASHBOARD_LOGS_SUCCESS = 'FETCH_DASHBOARD_LOGS_SUCCESS';
export const FETCH_DASHBOARD_LOGS_FAILURE = 'FETCH_DASHBOARD_LOGS_FAILURE';

export const FETCH_DASHBOARD_TOTAL_DURATION_AND_LOG_COUNT_REQUEST =
  'FETCH_DASHBOARD_TOTAL_DURATION_AND_LOG_COUNT_REQUEST';
export const FETCH_DASHBOARD_TOTAL_DURATION_AND_LOG_COUNT_SUCCESS =
  'FETCH_DASHBOARD_TOTAL_DURATION_AND_LOG_COUNT_SUCCESS';
export const FETCH_DASHBOARD_TOTAL_DURATION_AND_LOG_COUNT_FAILURE =
  'FETCH_DASHBOARD_TOTAL_DURATION_AND_LOG_COUNT_FAILURE';

// Action Creators

export const fetchDashboardTotalDurationAndLogCountRequest = () => ({
  type: FETCH_DASHBOARD_TOTAL_DURATION_AND_LOG_COUNT_REQUEST,
});

export const fetchDashboardTotalDurationAndLogCountSuccess = (
  totalDuration: number,
  logCount: number
) => ({
  type: FETCH_DASHBOARD_TOTAL_DURATION_AND_LOG_COUNT_SUCCESS,
  payload: { totalDuration, logCount },
});

export const fetchDashboardTotalDurationAndLogCountFailure = (error: string) => ({
  type: FETCH_DASHBOARD_TOTAL_DURATION_AND_LOG_COUNT_FAILURE,
  payload: error,
});

export const fetchLogsRequest = () => ({ type: FETCH_LOGS_REQUEST });

export const fetchLogsSuccess = (logs: any[], numberOfLog?: number) => ({
  type: FETCH_LOGS_SUCCESS,
  payload: logs,
  numberOfLog,
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

export const fetchDashboardLogsRequest = () => ({ type: FETCH_DASHBOARD_LOGS_REQUEST });

export const fetchDashboardLogsSuccess = (logs: any[]) => ({
  type: FETCH_DASHBOARD_LOGS_SUCCESS,
  payload: logs,
});

export const fetchDashboardLogsFailure = (error: string) => ({
  type: FETCH_DASHBOARD_LOGS_FAILURE,
  payload: error,
});

// Thunk Action Creator

export const fetchDashboardLogs = () => async (dispatch: any) => {
  try {
    dispatch(fetchDashboardLogsRequest());

    const response = await axiosInstance.get('/logs/dashboard/all'); // Update with your API endpoint

    dispatch(fetchDashboardLogsSuccess(response.data.statusCounts));
  } catch (error) {
    dispatch(fetchDashboardLogsFailure(error.message));
  }
};

export const fetchLogs =
  (page = 0, limit = 10) =>
  async (
    dispatch: (arg0: {
      type: string;
      payload?: string | any[];
      numberOfLog?: number | undefined;
    }) => void
  ) => {
    try {
      dispatch(fetchLogsRequest());

      const response = await axiosInstance.get('/logs', { params: { page, limit } });

      dispatch(fetchLogsSuccess(response.data.logs.logs, response.data.logs.totalLogs));
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

export const fetchDashboardTotalDurationAndLogCount = () => async (dispatch: any) => {
  try {
    dispatch(fetchDashboardTotalDurationAndLogCountRequest());

    const totalDurationAndLogCountResponse = await axiosInstance.get(
      'logs/dashboard/total-duration-and-count'
    );

    dispatch(
      fetchDashboardTotalDurationAndLogCountSuccess(
        totalDurationAndLogCountResponse.data.totalDuration,
        totalDurationAndLogCountResponse.data.totalLogs
      )
    );
  } catch (error) {
    dispatch(fetchDashboardTotalDurationAndLogCountFailure(error.message));
  }
};
