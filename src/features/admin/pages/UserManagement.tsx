import { useState, useMemo, useCallback } from "react";
import { Input } from "@/components/ui/input";
import {  Search } from "lucide-react";
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
import { formatDate, getRoleColor, getStatusColor } from "../utils";
import { useAdminAllUsersQuery } from "@/queries/admin/allUsers/useAdminAllUsersQuery";
import { PaginationComponent } from "@/shared/components/Pagination";
import AllUserMorePopOver from "../components/AllUserMorePopOver";

const AllUserTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState<number>(1);
  const memoisedPageUpdater = useCallback((page: number) => {
    setPage(page);
  }, []);
  const { data, isFetched } = useAdminAllUsersQuery(1, 10);

  const filteredMembers = useMemo(() => {
    if (!searchQuery.trim()) {
      return data?.users;
    }

    const query = searchQuery.toLowerCase().trim();
    return data?.users?.filter(
      (member) =>
        member.name.toLowerCase().includes(query) ||
        member.company.toLowerCase().includes(query)
    );
  }, [searchQuery, data, isFetched]);

  return (
    <div className="w-full space-y-4 dark:bg-gray-900">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl pt-10 pb-5">All Users</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
            <Input
              placeholder="Search by name or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredMembers && filteredMembers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground dark:text-gray-400">
              <Search className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>No members found matching "{searchQuery}"</p>
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
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMembers?.map((member, index) => (
                      <TableRow key={member.userId}>
                        <TableCell>{index + 1}</TableCell>
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
                              block={member.status === "active" ? false : true}
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
                {filteredMembers &&
                  filteredMembers?.map((member) => (
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
      ></PaginationComponent>
    </div>
  );
};

export default AllUserTable;
