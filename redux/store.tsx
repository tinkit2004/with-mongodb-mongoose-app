import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "../features/header/headerSlice";
import authTypeReducer from "../features/authType/authTypeSlice";
export const store = configureStore({
  reducer: {
    header: headerReducer,
    authType: authTypeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
