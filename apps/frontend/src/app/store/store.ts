import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { rootApiSlice } from '~/api-slices';

const reducer = combineReducers({
  // API sections
  [rootApiSlice.reducerPath]: rootApiSlice.reducer,
});

export const store = configureStore({
  reducer,
  preloadedState: {},
  devTools: process.env['NODE_ENV'] !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      rootApiSlice.middleware
    ),
});
