import { configureStore } from "@reduxjs/toolkit";
import ThemeSlice from "./slices/ThemeSlice";
import RegisterSlice from "./slices/RegisterSlice";
// ...

export const store = configureStore({
  reducer: {
    theme: ThemeSlice,
    register: RegisterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;
