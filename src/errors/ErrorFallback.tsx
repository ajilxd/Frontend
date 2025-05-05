import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  return (
    <div className="flex items-center justify-center p-4 w-full">
      <Card className="w-full max-w-md border-red-200 dark:border-red-800">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400" />
            <CardTitle className="text-red-600 dark:text-red-400">
              An error occurred
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          <div className="bg-red-50 dark:bg-red-900/20 rounded-md p-3 mb-4">
            <p className="font-mono text-sm text-red-800 dark:text-red-300">
              {error.message || "An unexpected error occurred"}
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Reload Page
          </Button>
          <Button
            onClick={resetErrorBoundary}
            className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white"
          >
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
