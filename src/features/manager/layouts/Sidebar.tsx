import {
  ChevronDown,
  ChevronRight,
  Plus,
  Calendar,
  Users,
  FileText,
  MessageSquare,
  PhoneCall,
  User,
  MessageSquareIcon,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useManagerSpacesQuery } from "@/queries/managers/spaces/useManagerSpacesQuery";
import { RootState } from "@/redux/store/appStore";
import { SignOutModal } from "@/shared/components/SignoutModal";

type SidebarPropsType = {
  toggleSidebar: VoidFunction;
  isSpacesOpen: boolean;
  toggleSpaces: VoidFunction;
  openProjects: Record<string, boolean>;
  toggleProject: (id: string) => void;
};

export const Sidebar: React.FC<SidebarPropsType> = ({
  toggleSidebar,
  isSpacesOpen,
  toggleSpaces,
  openProjects,
  toggleProject,
}) => {
  const navigate = useNavigate();
  const manager = useSelector((state: RootState) => state.manager);
  const { data: spaces } = useManagerSpacesQuery(manager.id);
  console.log({ spaces });
  return (
    <>
      <div className="p-4 flex items-center justify-between border-b dark:border-gray-800">
        <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
          Fluenta Work / Managers
        </h2>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleSidebar}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="p-2">
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => navigate("/manager/dashboard/profile")}
            >
              <User className="h-5 w-5 mr-3" />
              <span>Profile</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => navigate("/manager/dashboard/users")}
            >
              <Users className="h-5 w-5 mr-3" />
              <span>Add Users</span>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => navigate("/manager/dashboard/chat")}
            >
              <MessageSquareIcon className="h-5 w-5 mr-3" />
              <span>Messages</span>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => navigate("/manager/dashboard/calendar")}
            >
              <Calendar className="h-5 w-5 mr-3" />
              <span>Calendar</span>
            </Button>
          </div>

          {/* Spaces/Projects Section */}
          <div className="mt-6">
            <Collapsible open={isSpacesOpen} onOpenChange={toggleSpaces}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between font-medium text-gray-600 dark:text-gray-400"
                >
                  <div className="flex items-center">
                    <Plus className="h-4 w-4 mr-3" />
                    <span>Spaces</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isSpacesOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-2 space-y-1 pl-2">
                  {spaces?.map((space) => (
                    <Collapsible
                      key={space._id}
                      open={openProjects[space._id]}
                      onOpenChange={() => toggleProject(space._id)}
                    >
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-between text-sm"
                        >
                          <div className="flex items-center">
                            <span>{space.name}</span>
                          </div>
                          <ChevronRight
                            className={`h-4 w-4 transition-transform ${
                              openProjects[space._id] ? "rotate-90" : ""
                            }`}
                          />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="ml-5 space-y-1 mt-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-xs pl-3"
                            onClick={() =>
                              navigate(
                                `/manager/dashboard/spaces/${space._id}/chat`
                              )
                            }
                          >
                            <MessageSquare className="h-3.5 w-3.5 mr-2" />
                            Chat
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-xs pl-3"
                            onClick={() =>
                              navigate(
                                `/manager/dashboard/spaces/${space._id}/docs`
                              )
                            }
                          >
                            <FileText className="h-3.5 w-3.5 mr-2" />
                            Docs
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-xs pl-3"
                            onClick={() =>
                              navigate(
                                `/manager/dashboard/spaces/${space._id}/members`
                              )
                            }
                          >
                            <Users className="h-3.5 w-3.5 mr-2" />
                            Members
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-xs pl-3"
                            onClick={() =>
                              navigate(
                                `/manager/dashboard/spaces/${space._id}/tasks`
                              )
                            }
                          >
                            <ChevronRight className="h-3.5 w-3.5 mr-2" />
                            Tasks
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-xs pl-3"
                            onClick={() =>
                              navigate(
                                `/manager/dashboard/spaces/${space._id}/meeting`
                              )
                            }
                          >
                            <PhoneCall className="h-3.5 w-3.5 mr-2" />
                            Meeting
                          </Button>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </nav>
      </div>
      <SignOutModal user="manager" />
    </>
  );
};
