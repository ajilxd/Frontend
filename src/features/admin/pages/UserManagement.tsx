import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate, getRoleColor, getStatusColor } from "../utils";
import { useAdminAllUsersQuery } from "@/queries/admin/allUsers/useAdminAllUsersQuery";
import { PaginationComponent } from "@/shared/components/Pagination";
import AllUserMorePopOver from "../components/AllUserMorePopOver";
import { debounce } from "@/utils/debounce";

const AllUserTable = () => {
  const [search, setSearch] = useState("");
  const [keystroke, setKeystroke] = useState("");
  const [role, setRole] = useState<"user" | "manager" | "owner" | "">("");
  const [status, setStatus] = useState<"active" | "inactive" | "">("");
  const [page, setPage] = useState<number>(1);

  const memoisedPageUpdater = useCallback((page: number) => {
    setPage(page);
  }, []);

  // Fixed: Use page state instead of hardcoded 1
  const { data } = useAdminAllUsersQuery(page, 10, search, role, status);

  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setSearch(value);
    }, 1000),
    []
  );

  const handleRoleChange = useCallback((value: string) => {
    if (value === "all") {
      setRole("");
    } else {
      setRole(value as "user" | "manager" | "owner" | "");
    }
    setPage(1);
  }, []);

  const handleStatusChange = useCallback((value: string) => {
    if (value === "all") {
      setStatus("");
    } else {
      setStatus(value as "active" | "inactive" | "");
    }
    setPage(1);
  }, []);

  return (
    <div className="w-full space-y-4 dark:bg-gray-900">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl pt-10 pb-5">All Users</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
              <Input
                placeholder="Search by name or company..."
                value={keystroke}
                onChange={(e) => {
                  const value = e.target.value;
                  setKeystroke(value);
                  debouncedSetSearch(value);
                }}
                className="pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
              />
            </div>
            <Select value={role} onValueChange={handleRoleChange}>
              <SelectTrigger className="w-full sm:w-[140px] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                <SelectItem value="all" className="dark:text-gray-100">
                  All Roles
                </SelectItem>
                <SelectItem value="user" className="dark:text-gray-100">
                  User
                </SelectItem>
                <SelectItem value="manager" className="dark:text-gray-100">
                  Manager
                </SelectItem>
                <SelectItem value="owner" className="dark:text-gray-100">
                  Owner
                </SelectItem>
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full sm:w-[140px] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                <SelectItem value="all" className="dark:text-gray-100">
                  All Status
                </SelectItem>
                <SelectItem value="active" className="dark:text-gray-100">
                  Active
                </SelectItem>
                <SelectItem value="inactive" className="dark:text-gray-100">
                  Inactive
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {data && data?.users.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground dark:text-gray-400">
              <Search className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>No members found matching "{search}"</p>
              <p className="text-sm mt-1">Try searching by name or company</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block h-[480px] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No</TableHead>
                      <TableHead>Member</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>User ID</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data &&
                      data.users?.map((member, index) => (
                        <TableRow key={member.userId}>
                          <TableCell>{(page - 1) * 10 + index + 1}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={member.image}
                                  alt={member.name}
                                />
                                <AvatarFallback>
                                  {member.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{member.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className={getRoleColor(member.role)}
                            >
                              {member.role}
                            </Badge>
                          </TableCell>
                          <TableCell>{member.company}</TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className={getStatusColor(member.status)}
                            >
                              {member.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {formatDate("" + member.joinedAt)}
                          </TableCell>
                          <TableCell>
                            <code className="text-xs bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-800 dark:text-gray-300">
                              {member.userId.slice(-8)}
                            </code>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-row justify-end pr-6">
                              <AllUserMorePopOver
                                role={member.role}
                                id={member.userId}
                                block={
                                  member.status === "active" ? false : true
                                }
                                page={page}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>

              <div className="md:hidden space-y-4">
                {data &&
                  data.users?.map((member) => (
                    <Card
                      key={member.userId}
                      className="p-4 dark:bg-gray-800 dark:border-gray-700"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={member.image}
                                alt={member.name}
                              />
                              <AvatarFallback>
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-sm text-muted-foreground dark:text-gray-400">
                                {member.company}
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant="secondary"
                            className={getStatusColor(member.status)}
                          >
                            {member.status}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <span className="text-muted-foreground dark:text-gray-400">
                              Role:
                            </span>
                            <Badge
                              variant="secondary"
                              className={getRoleColor(member.role)}
                            >
                              {member.role}
                            </Badge>
                          </div>
                          <span className="text-muted-foreground dark:text-gray-400">
                            Joined {formatDate("" + member.joinedAt)}
                          </span>
                        </div>

                        <div className="text-xs text-muted-foreground dark:text-gray-400">
                          ID:{" "}
                          <code className="bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-800 dark:text-gray-300">
                            {member.userId}
                          </code>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
      <PaginationComponent
        paginationHandler={memoisedPageUpdater}
        currentPage={page}
        totalPages={data?.totalPage ?? 1}
      />
    </div>
  );
};

export default AllUserTable;
