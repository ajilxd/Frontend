import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import "./axios/index.ts";
import App from "./App.tsx";
import { PeerSocketProvider } from "./context/PeerSocketContextProvider.tsx";
import { SocketProvider } from "./context/SocketContextProvider.tsx";
import { ThemeContextProvider } from "./context/ThemeContextProvider.tsx";
import { TransportProvider } from "./context/TransportContextProvider.tsx";
import { ErrorFallback } from "./errors/ErrorFallback.tsx";
import { store } from "./redux/store/appStore.ts";
import { NotificationSocketProvider } from "./context/NotificationContextProvider.tsx";
import { Calendar } from "./shared/components/Calander/context/CalendarContextProvider.tsx";
import { Toaster } from "sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        if (error?.response?.status === 404) return false;
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <QueryClientProvider client={queryClient}>
      <NotificationSocketProvider>
        <PeerSocketProvider>
          <TransportProvider>
            <SocketProvider>
              <Provider store={store}>
                <BrowserRouter>
                  <ThemeContextProvider>
                    <Calendar>
                      <SnackbarProvider
                        maxSnack={3}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        autoHideDuration={3000}
                      >
                        <App />
                        <Toaster position="top-center" richColors />
                      </SnackbarProvider>
                    </Calendar>
                  </ThemeContextProvider>
                </BrowserRouter>
              </Provider>
            </SocketProvider>
          </TransportProvider>
        </PeerSocketProvider>
      </NotificationSocketProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);
