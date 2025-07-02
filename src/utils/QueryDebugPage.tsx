import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function QueryDebuggerPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-10">
        <div className="bg-white shadow-md rounded-xl p-6 max-w-md w-full space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">
            🛠 TanStack Query Debugger
          </h1>
          <p className="text-sm text-gray-600">
            View and manage your React Query cache state here.
          </p>
        </div>

        <ReactQueryDevtools initialIsOpen={true} />
      </div>
    </QueryClientProvider>
  );
}
