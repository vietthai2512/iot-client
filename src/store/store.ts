/* eslint-disable max-len */
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './theme/theme';
import authReducer from 'src/store/auth';
import snackbarReducer from 'src/store/snackbar';

const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    theme: themeReducer,
    auth: authReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
//Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
