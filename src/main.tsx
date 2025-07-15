import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import { PeerSocketProvider } from "./context/PeerSocketContextProvider.tsx";
import { SocketProvider } from "./context/SocketContextProvider.tsx";
import { ThemeContextProvider } from "./context/ThemeContextProvider.tsx";
import { TransportProvider } from "./context/TransportContextProvider.tsx";
import { ErrorFallback } from "./errors/ErrorFallback.tsx";
import { store } from "./redux/store/appStore.ts";
import { NotificationSocketProvider } from "./context/NotificationContextProvider.tsx";
import AuthContextProvider from "./context/AuthContextProvider.tsx";
import { Calendar } from "./shared/components/Calander/context/CalendarContextProvider.tsx";
import { Toaster } from "sonner";
import { EventType } from "react-hook-form";

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
                  <AuthContextProvider>
                    <ThemeContextProvider>
                      <Calendar
                        onEventClick={(event: EventType) =>
                          alert("Event clicked: " + JSON.stringify(event))
                        }
                      >
                        <SnackbarProvider
                          maxSnack={3}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          autoHideDuration={3000}
                        >
                          <App />
                          <Toaster />
                        </SnackbarProvider>
                      </Calendar>
                    </ThemeContextProvider>
                  </AuthContextProvider>
                </BrowserRouter>
              </Provider>
            </SocketProvider>
          </TransportProvider>
        </PeerSocketProvider>
      </NotificationSocketProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);
