import rootReducer from "./reducer";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, Store, AnyAction } from 'redux';
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
  TypedUseSelectorHook,
} from 'react-redux';

export const store: Store<any, AnyAction> = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export type AppDispatch = typeof store.dispatch;


export type RootState = ReturnType<typeof rootReducer>;

const useDispatch = () => useAppDispatch<AppDispatch>();

const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export { useSelector, useDispatch };
