import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/auth/auth.slice';
import musicReducer from './slices/music/music.slice';

// Global store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    music: musicReducer,
    // Add other reducers here as needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
