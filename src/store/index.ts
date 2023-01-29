import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import dataReducer from './dataSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

store.subscribe(() => {
  localStorage.setItem('appState', JSON.stringify(store.getState()));
});

export type ApplicationState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<ApplicationState> = useSelector;
