import { SnackbarProvider } from "notistack";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import AuthProvider from "./axios/AuthProvider.tsx";
import { ThemeContextProvider } from "./context/ThemeContextProvider.tsx";
import { store } from "./redux/store/appStore.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeContextProvider>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            autoHideDuration={3000}
          >
            <AuthProvider />
            <App />
          </SnackbarProvider>
        </ThemeContextProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
