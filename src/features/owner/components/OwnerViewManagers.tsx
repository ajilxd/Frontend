import { useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal } from "lucide-react";
import { enqueueSnackbar } from "notistack";
import { useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useManagersQuery } from "@/queries/owners/managers/useManagersQuery";
import { RootState } from "@/redux/store/appStore";
import { ChaseSpinner } from "@/shared/components/ChaseSpinner";

import { ownerToggleManagerStatus } from "../api/owner.api";

export function OwnerViewManagers() {
  const owner = useSelector((state: RootState) => state.owner);
  const queryClient = useQueryClient();

  const handleToggleStatus = async (managerId: string) => {
    const response = await ownerToggleManagerStatus(managerId, "" + owner._id);
    if (response.success) {
      enqueueSnackbar(response.message, { variant: "success" });
      queryClient.invalidateQueries({
        queryKey: ["owner", "managers", "" + owner._id],
      });
    } else {
      enqueueSnackbar("Something went wrong, try again", { variant: "error" });
      console.error(response.message);
    }
  };

  const {
    data: Managers,
    error,
    isError,
    isLoading,
  } = useManagersQuery(owner._id!);

  return (
    <div className="w-full p-4 space-y-4 bg-white dark:bg-slate-900 rounded-lg">
      <div className="overflow-x-auto rounded-md border border-slate-200 dark:border-slate-700">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-slate-50 dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800">
              <TableHead className="w-14 text-slate-600 dark:text-slate-400 font-medium">
                #
              </TableHead>
              <TableHead className="text-slate-600 dark:text-slate-400 font-medium">
                Name
              </TableHead>
              <TableHead className="text-slate-600 dark:text-slate-400 font-medium hidden md:table-cell">
                Email
              </TableHead>
              <TableHead className="text-right text-slate-600 dark:text-slate-400 font-medium">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isError && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-red-500">
                  {error.message}
                </TableCell>
              </TableRow>
            )}

            {isLoading && (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  <div className="flex justify-center items-center h-full">
                    <ChaseSpinner />
                  </div>
                </TableCell>
              </TableRow>
            )}

            {!isLoading && !isError && Managers?.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500">
                  No managers found.
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              !isError &&
              Managers?.map((manager, index) => (
                <TableRow
                  key={manager._id}
                  className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <TableCell className="font-medium text-slate-900 dark:text-slate-200">
                    {index + 1}
                  </TableCell>
                  <TableCell className="font-medium text-slate-900 dark:text-slate-200">
                    {manager.name}
                  </TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400 hidden md:table-cell">
                    {manager.email}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                      >
                        <DropdownMenuItem
                          onClick={() => handleToggleStatus(manager._id)}
                          className={`cursor-pointer ${
                            manager.isBlocked
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {manager.isBlocked ? "Unblock" : "Block"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer text-slate-700 dark:text-slate-300"
                          onClick={() => {
                            enqueueSnackbar(
                              `Viewing details for ${manager.name}`,
                              {
                                variant: "info",
                              }
                            );
                          }}
                        >
                          View Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
