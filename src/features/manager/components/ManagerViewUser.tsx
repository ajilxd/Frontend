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
import { useManagerUsersQuery } from "@/queries/managers/users/useManagerUsersQuery";
import { RootState } from "@/redux/store/appStore";

import { managerToggleUserStatus } from "../api/manager.api";

export function ManagerViewUsers() {
  const manager = useSelector((state: RootState) => state.manager);
  const { data: Users, refetch } = useManagerUsersQuery(manager.id);

  const handleToggleStatus = async (userId: string) => {
    const response = await managerToggleUserStatus(userId, "" + manager.id);
    if (response.success) {
      enqueueSnackbar(response.message, { variant: "success" });
      refetch();
    } else {
      console.error(response);
      enqueueSnackbar("Something went wrong, try again", { variant: "error" });
    }
  };

  return (
    <div className="w-full p-4 space-y-4 bg-white dark:bg-slate-900 rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
          Users
        </h2>
      </div>

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
            {Users?.map((user, index) => (
              <TableRow
                key={user._id}
                className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <TableCell className="font-medium text-slate-900 dark:text-slate-200">
                  {index + 1}
                </TableCell>
                <TableCell className="font-medium text-slate-900 dark:text-slate-200">
                  {user.name}
                </TableCell>
                <TableCell className="text-slate-600 dark:text-slate-400 hidden md:table-cell">
                  {user.email}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                    >
                      <DropdownMenuItem
                        onClick={() => handleToggleStatus(user._id)}
                        className={`cursor-pointer ${
                          user.isBlocked
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
                      </DropdownMenuItem>
                      {/* <DropdownMenuItem
                        className="cursor-pointer text-slate-700 dark:text-slate-300"
                        onClick={() => {
                          enqueueSnackbar(`Viewing details for ${user.name}`, {
                            variant: "info",
                          });
                        }}
                      >
                        View Details
                      </DropdownMenuItem> */}
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
