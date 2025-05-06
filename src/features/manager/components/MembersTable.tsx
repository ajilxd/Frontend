import { Check, MoreHorizontal } from "lucide-react";
import { useParams } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { UserType } from "@/types";

type Props = {
  members: UserType[];
  selectedMembers: string[];
  toggleMemberSelection: (id: string) => void;
  hasTeamMembers: boolean;
};

export function MembersTable({
  members,
  selectedMembers,
  toggleMemberSelection,
  hasTeamMembers,
}: Props) {
  const { spaceid } = useParams();
  console.log(selectedMembers);
  return (
    <div className="rounded-md border border-gray-800 overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-900">
          <TableRow className="hover:bg-gray-900 border-gray-800">
            {!hasTeamMembers && (
              <TableHead className="w-12 text-gray-400">
                <span className="sr-only">Select</span>
              </TableHead>
            )}
            <TableHead className="text-gray-400">Member</TableHead>
            <TableHead className="text-gray-400">Role</TableHead>
            <TableHead className="text-gray-400">Projects</TableHead>
            <TableHead className="w-12 text-gray-400">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members?.map((member) => (
            <TableRow
              key={member._id}
              className="hover:bg-gray-900 border-gray-800"
            >
              {!hasTeamMembers && (
                <TableCell>
                  <div className="flex items-center justify-center">
                    <button
                      disabled={member.spaces?.includes("" + spaceid)}
                      onClick={() => toggleMemberSelection(member._id)}
                      className={`w-6 h-6 rounded flex items-center justify-center border ${
                        member.spaces?.includes("" + spaceid)
                          ? "bg-blue-600 border-blue-600"
                          : "border-gray-600 hover:border-gray-500"
                      }`}
                    >
                      {member.spaces?.includes("" + spaceid) && (
                        <Check className="h-4 w-4 text-white" />
                      )}
                    </button>
                  </div>
                </TableCell>
              )}
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
                  variant={member.role === "Manager" ? "default" : "secondary"}
                  className={`${
                    member.role === "Manager"
                      ? "bg-blue-900/30 text-blue-400 hover:bg-blue-900/20"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
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
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0 hover:bg-gray-800"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-gray-900 border-gray-800 text-gray-200"
                  >
                    <DropdownMenuItem className="text-red-500 hover:bg-gray-800 hover:text-red-500 cursor-pointer">
                      Remove Member
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
