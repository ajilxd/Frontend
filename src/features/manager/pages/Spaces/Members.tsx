import { Search, Plus, Check, MoreHorizontal, Users, X } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Members() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddToProjectDialog, setShowAddToProjectDialog] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);

  // Sample data
  const members = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@example.com",
      role: "Manager",
      projects: ["Marketing Website", "Mobile App"],
    },
    {
      id: 2,
      name: "Sam Taylor",
      email: "sam@example.com",
      role: "User",
      projects: ["Marketing Website"],
    },
    {
      id: 3,
      name: "Jamie Smith",
      email: "jamie@example.com",
      role: "Manager",
      projects: ["CRM System"],
    },
  ];

  const projects = [
    { id: 1, name: "Marketing Website" },
    { id: 2, name: "Mobile App" },
    { id: 3, name: "CRM System" },
    { id: 4, name: "Analytics Dashboard" },
  ];

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleMemberSelection = (memberId) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter((id) => id !== memberId));
    } else {
      setSelectedMembers([...selectedMembers, memberId]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-gray-200">
      {/* Header */}
      <header className="border-b border-gray-800 p-4">
        <div className="container mx-auto">
          <h1 className="text-xl font-semibold text-white">
            Member Management
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        <div className="container mx-auto space-y-6">
          {/* Search and Actions Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search members..."
                className="pl-10 bg-gray-900 border-gray-800 text-gray-200 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                className="border-gray-700 hover:bg-gray-800 flex-1 sm:flex-none"
                disabled={selectedMembers.length === 0}
                onClick={() => setShowAddToProjectDialog(true)}
              >
                <Users className="h-4 w-4 mr-2" />
                Add to Project
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all-members" className="w-full">
            <TabsList className="bg-gray-900 border-b border-gray-800">
              <TabsTrigger
                value="all-members"
                className="data-[state=active]:bg-gray-800"
              >
                All Members
              </TabsTrigger>
              <TabsTrigger
                value="managers"
                className="data-[state=active]:bg-gray-800"
              >
                Managers
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="data-[state=active]:bg-gray-800"
              >
                Users
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all-members" className="mt-4">
              <MembersTable
                members={filteredMembers}
                selectedMembers={selectedMembers}
                toggleMemberSelection={toggleMemberSelection}
              />
            </TabsContent>

            <TabsContent value="managers" className="mt-4">
              <MembersTable
                members={filteredMembers.filter((m) => m.role === "Manager")}
                selectedMembers={selectedMembers}
                toggleMemberSelection={toggleMemberSelection}
              />
            </TabsContent>

            <TabsContent value="users" className="mt-4">
              <MembersTable
                members={filteredMembers.filter((m) => m.role === "User")}
                selectedMembers={selectedMembers}
                toggleMemberSelection={toggleMemberSelection}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Add to Project Dialog */}
      <Dialog
        open={showAddToProjectDialog}
        onOpenChange={setShowAddToProjectDialog}
      >
        <DialogContent className="bg-gray-900 border-gray-800 text-gray-200 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Add to Project</DialogTitle>
            <DialogDescription>
              Select a project to add the selected members to.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="project" className="text-sm font-medium">
                Project
              </label>
              <Select>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id.toString()}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Selected Members ({selectedMembers.length})
              </label>
              <div className="bg-gray-800 rounded-md p-2 min-h-16 flex flex-wrap gap-2">
                {selectedMembers.map((id) => {
                  const member = members.find((m) => m.id === id);
                  return (
                    <Badge
                      key={id}
                      variant="secondary"
                      className="bg-gray-700 text-gray-200 flex items-center gap-1"
                    >
                      {member.name}
                      <button
                        className="ml-1"
                        onClick={() => toggleMemberSelection(id)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  );
                })}
                {selectedMembers.length === 0 && (
                  <p className="text-gray-500 text-sm p-2">
                    No members selected
                  </p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              className="border-gray-700 hover:bg-gray-800"
              onClick={() => setShowAddToProjectDialog(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              disabled={selectedMembers.length === 0}
            >
              Add to Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function MembersTable({ members, selectedMembers, toggleMemberSelection }) {
  return (
    <div className="rounded-md border border-gray-800 overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-900">
          <TableRow className="hover:bg-gray-900 border-gray-800">
            <TableHead className="w-12 text-gray-400">
              <span className="sr-only">Select</span>
            </TableHead>
            <TableHead className="text-gray-400">Member</TableHead>
            <TableHead className="text-gray-400">Role</TableHead>
            <TableHead className="text-gray-400">Projects</TableHead>
            <TableHead className="w-12 text-gray-400">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.length > 0 ? (
            members.map((member) => (
              <TableRow
                key={member.id}
                className="hover:bg-gray-900 border-gray-800"
              >
                <TableCell>
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => toggleMemberSelection(member.id)}
                      className={`w-6 h-6 rounded flex items-center justify-center border ${
                        selectedMembers.includes(member.id)
                          ? "bg-blue-600 border-blue-600"
                          : "border-gray-600 hover:border-gray-500"
                      }`}
                    >
                      {selectedMembers.includes(member.id) && (
                        <Check className="h-4 w-4 text-white" />
                      )}
                    </button>
                  </div>
                </TableCell>
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
                    {member.projects.length > 0 ? (
                      member.projects.map((project, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="border-gray-700 text-gray-300"
                        >
                          {project}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs text-gray-500">No projects</span>
                    )}
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
                      <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
                        Edit Member
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
                        Manage Projects
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500 hover:bg-gray-800 hover:text-red-500 cursor-pointer">
                        Remove Member
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                No members found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
