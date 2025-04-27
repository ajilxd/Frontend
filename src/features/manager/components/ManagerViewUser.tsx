import { MoreHorizontal, Search } from "lucide-react";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RootState } from "@/redux/store/appStore";

import { managerFetchUser, managerToggleUserStatus } from "../api/manager.api";

type userType = {
  name: string;
  email: string;
  status: string;
  image: string;
  isBlocked: boolean;
  _id: string;
};

export function ManagerViewUsers() {
  const [users, setUsers] = useState<userType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const manager = useSelector((state: RootState) => state.manager);

  const handleToggleStatus = async (userId: string) => {
    const response = await managerToggleUserStatus(userId, "" + manager.id);
    if (response.success) {
      enqueueSnackbar(response.message, { variant: "success" });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isBlocked: !user.isBlocked } : user
        )
      );
    } else {
      console.error(response);
      enqueueSnackbar("Something went wrong, try again", { variant: "error" });
    }
  };

  useEffect(() => {
    if (!manager.id) return;

    async function getManagers(id: string) {
      const response = await managerFetchUser(id);
      if (response.success) {
        setUsers(response.data.data);
      } else {
        console.warn(response.message);
      }
    }

    getManagers(manager.id);
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full p-4 space-y-4 bg-white dark:bg-slate-900 rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
          Users
        </h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
          />
        </div>
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
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
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
                          onClick={() => handleToggleStatus(user._id)}
                          className={`cursor-pointer ${
                            user.isBlocked
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {user.isBlocked ? "Unblock" : "Block"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer text-slate-700 dark:text-slate-300"
                          onClick={() => {
                            enqueueSnackbar(
                              `Viewing details for ${user.name}`,
                              { variant: "info" }
                            );
                          }}
                        >
                          View Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-slate-500 dark:text-slate-400"
                >
                  {searchQuery
                    ? "No users found matching your search"
                    : "No users found"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {users.length > 0 && (
        <div className="py-2 text-sm text-slate-500 dark:text-slate-400">
          Showing {filteredUsers.length} of {users.length} users
        </div>
      )}
    </div>
  );
}
