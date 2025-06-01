import { useAppDispatch } from "@/store/hooks";
import {
  setTheme,
  THEME_KEY,
  type ThemeState,
} from "@/store/slices/ThemeSlice";
import React, { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const localTheme = localStorage.getItem(THEME_KEY);
    const isDark = window.matchMedia("(prefers-color-scheme: dark)");
    if (localTheme) {
      dispatch(
        setTheme({ currentTheme: localTheme as ThemeState["currentTheme"] }),
      );
    } else {
      // If no theme is set in localStorage, set the default theme
      dispatch(setTheme({ currentTheme: isDark ? "dark" : "light" }));
    }
  }, [dispatch]);
  return <>{children}</>;
};

export default ThemeProvider;
