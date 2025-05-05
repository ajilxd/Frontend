import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import AuthProvider from "./axios/AuthProvider.tsx";
import { ThemeContextProvider } from "./context/ThemeContextProvider.tsx";
import { ErrorFallback } from "./errors/ErrorFallback.tsx";
import { store } from "./redux/store/appStore.ts";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);
