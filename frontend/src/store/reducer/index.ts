// rootReducer.ts
import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import projectReducer from './products.reducer';
import logReducer from './logs.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  projects: projectReducer,
  logs:logReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
