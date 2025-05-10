import { useParams } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUserSpaceMembersQuery } from "@/queries/users/members/useUserQuery";

export function Members() {
  const { spaceid } = useParams();
  const { data: members } = useUserSpaceMembersQuery("" + spaceid);
  console.log("from member", members);

  return (
    <div>
      <div className="m-4">
        <h1 className="text-2xl font-bold tracking-tight dark:text-white">
          My Team
        </h1>
      </div>
      <div className="rounded-md border border-gray-800 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-900">
            <TableRow className="hover:bg-gray-900 border-gray-800">
              <TableHead className="text-gray-400">Member</TableHead>
              <TableHead className="text-gray-400">Role</TableHead>
              <TableHead className="text-gray-400">Projects</TableHead>
              <TableHead className="w-12 text-gray-400">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members?.length &&
              members?.map((member) => (
                <TableRow
                  key={member._id}
                  className="hover:bg-gray-900 border-gray-800"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 bg-gray-700">
                        <AvatarImage
                          src={`/api/placeholder/40/40`}
                          alt={member.name}
                        />
                        <AvatarFallback className="bg-gray-700 text-gray-200">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-gray-200">
                          {member.name}
                        </p>
                        <p className="text-xs text-gray-400">{member.email}</p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        member.role === "Manager" ? "default" : "secondary"
                      }
                      className="bg-blue-900/30 text-blue-400 hover:bg-blue-900/20"
                    >
                      {member.role}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      <Badge
                        key={member._id}
                        variant="outline"
                        className="border-gray-700 text-gray-300"
                      >
                        Furni
                      </Badge>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
