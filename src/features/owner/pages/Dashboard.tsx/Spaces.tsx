import {
  MoreHorizontal,
  Archive,
  Edit,
  CheckCircle,
  Search,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSpacesQuery } from "@/queries/owners/spaces/useOwnerSpacesQuery";
import { RootState } from "@/redux/store/appStore";

import { AddSpaceForm } from "../../components/AddSpaceForm";
import { EditSpaceDialog } from "../../components/EditSpaceDialog";

const Spaces = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState("projects");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editSpaceId, setEditSpaceId] = useState("");
  const [openDropdown, setOpenDropdown] = useState("");
  const owner = useSelector((state: RootState) => state.owner);
  const { data: Spaces } = useSpacesQuery(owner._id!);

  const filteredSpaces = Spaces?.filter((space) =>
    space.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (spaceId: string) => {
    setEditSpaceId(spaceId);
    setIsEditDialogOpen(true);
    setOpenDropdown("");
  };

  const handleStatusChange = (spaceId: string, newStatus: string) => {
    console.log(`Changing project ${spaceId} status to ${newStatus}`);
    setOpenDropdown("");
  };

  const getStatusBadge = (status: string) => {
    const badgeProps = {
      active: {
        text: "Active",
        icon: <Clock className="h-3 w-3" />,
        className:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
      },
      completed: {
        text: "Completed",
        icon: <CheckCircle className="h-3 w-3" />,
        className:
          "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
      },
      archived: {
        text: "Archived",
        icon: <Archive className="h-3 w-3" />,
        className:
          "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100",
      },
    };

    const config = badgeProps[status as keyof typeof badgeProps];

    return config ? (
      <Badge className={`flex items-center gap-1 ${config.className}`}>
        {config.icon}
        {config.text}
      </Badge>
    ) : (
      <Badge>{status}</Badge>
    );
  };

  return (
    <>
      <EditSpaceDialog
        ownerId={"" + owner._id}
        spaceId={editSpaceId}
        canOpen={isEditDialogOpen}
        closeHandler={() => setIsEditDialogOpen(false)}
      />

      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 p-4 md:p-8 transition-colors">
        <Tabs
          defaultValue="projects"
          value={currentTab}
          onValueChange={setCurrentTab}
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <TabsList className="bg-gray-100 dark:bg-gray-800">
              <TabsTrigger value="projects">Spaces</TabsTrigger>
              <TabsTrigger value="add-space">Add Space</TabsTrigger>
            </TabsList>

            {currentTab === "projects" && (
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
            )}
          </div>

          <TabsContent value="projects" className="mt-0">
            <Card className="bg-white dark:bg-gray-900 shadow-md transition-colors">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  Spaces
                </CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                  Manage all your workspace projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-200 dark:border-gray-800">
                        {["Name", "Status", "Managers", "Actions"].map(
                          (header, i) => (
                            <TableHead
                              key={i}
                              className={`text-gray-700 dark:text-gray-300 ${
                                header === "Actions" ? "text-right" : ""
                              }`}
                            >
                              {header}
                            </TableHead>
                          )
                        )}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSpaces?.length ? (
                        filteredSpaces.map((project) => (
                          <TableRow
                            key={project._id}
                            className="border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                          >
                            <TableCell className="font-medium text-gray-900 dark:text-white">
                              {project.name}
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(project.status)}
                            </TableCell>
                            <TableCell>
                              <div className="flex -space-x-2 overflow-hidden">
                                {project.managers.length}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="relative inline-block text-left">
                                <button
                                  onClick={() =>
                                    setOpenDropdown((prev) =>
                                      prev === project._id ? "" : project._id
                                    )
                                  }
                                  className="h-8 w-8 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full flex items-center justify-center"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </button>

                                {openDropdown === project._id && (
                                  <div className="fixed transform translate-y-2 -translate-x-40 w-48 rounded-md shadow-lg z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-visible">
                                    <div className="py-1">
                                      <button
                                        onClick={() =>
                                          handleEditClick("" + project._id)
                                        }
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center"
                                      >
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit
                                      </button>
                                      {project.status !== "completed" && (
                                        <button
                                          onClick={() =>
                                            handleStatusChange(
                                              project._id,
                                              "completed"
                                            )
                                          }
                                          className="w-full text-left px-4 py-2 text-sm text-green-600 dark:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center"
                                        >
                                          <CheckCircle className="h-4 w-4 mr-2" />
                                          Mark as Completed
                                        </button>
                                      )}
                                      {project.status !== "archived" && (
                                        <button
                                          onClick={() =>
                                            handleStatusChange(
                                              project._id,
                                              "archived"
                                            )
                                          }
                                          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center"
                                        >
                                          <Archive className="h-4 w-4 mr-2" />
                                          Archive
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={4}
                            className="text-center py-10 text-gray-500 dark:text-gray-400"
                          >
                            No projects found matching your search.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add-space" className="mt-0">
            <AddSpaceForm ownerId={owner._id!} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Spaces;
