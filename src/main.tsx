import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./router.ts";

import "./styles/index.css";
import TranslationProvider from "./providers/TranslationProvider.tsx";
import ThemeProvider from "./providers/ThemeProvider.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <TranslationProvider>
          <RouterProvider router={router} />
        </TranslationProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
