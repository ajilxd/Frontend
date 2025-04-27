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

import {
  ownerFetchAllManagers,
  ownerToggleManagerStatus,
} from "../api/owner.api";

type ManagerType = {
  name: string;
  email: string;
  status: string;
  profile: string;
  isBlocked: boolean;
  _id: string;
};

export function OwnerViewManagers() {
  const [managers, setManagers] = useState<ManagerType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const owner = useSelector((state: RootState) => state.owner);

  const handleToggleStatus = async (managerId: string) => {
    const response = await ownerToggleManagerStatus(managerId, "" + owner._id);
    if (response.success) {
      enqueueSnackbar(response.message, { variant: "success" });
      // Update the local state to reflect the change
      setManagers((prevManagers) =>
        prevManagers.map((manager) =>
          manager._id === managerId
            ? { ...manager, isBlocked: !manager.isBlocked }
            : manager
        )
      );
    } else {
      enqueueSnackbar("Something went wrong, try again", { variant: "error" });
      console.error(response.message);
    }
  };

  useEffect(() => {
    if (!owner._id) return;

    async function getManagers(id: string) {
      const response = await ownerFetchAllManagers(id);
      if (response.success) {
        setManagers(response.data.data);
      } else {
        console.warn(response.message);
      }
    }

    getManagers(owner._id);
  }, [owner._id]);

  const filteredManagers = managers.filter(
    (manager) =>
      manager.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      manager.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full p-4 space-y-4 bg-white dark:bg-slate-900 rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
          Managers
        </h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search managers..."
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
            {filteredManagers.length > 0 ? (
              filteredManagers.map((manager, index) => (
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
                    ? "No managers found matching your search"
                    : "No managers found"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {managers.length > 0 && (
        <div className="py-2 text-sm text-slate-500 dark:text-slate-400">
          Showing {filteredManagers.length} of {managers.length} managers
        </div>
      )}
    </div>
  );
}
