import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface ThemeState {
  currentTheme: "light" | "dark";
}

export const THEME_KEY = "theme_app";
const localTheme = localStorage.getItem(THEME_KEY) || "light";

const initialState: ThemeState = {
  currentTheme: localTheme
    ? (localTheme as ThemeState["currentTheme"])
    : "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeState>) => {
      const { currentTheme } = action.payload;
      localStorage.setItem(THEME_KEY, currentTheme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(currentTheme);
      state.currentTheme = currentTheme;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
