import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { ManagerContextProvider } from "@/context/ManagerContextProvider";
import PrivateRoute from "@/hoc/PrivateRoute";
import { useManagerChatsQuery } from "@/queries/managers/chats/useChatQuery";
import { useManagerSpacesByIdQuery } from "@/queries/managers/spaces/useManagerSpaceByIdQuery";
import { RootState } from "@/redux/store/appStore";
import Chat from "@/shared/components/Chat";
import Meeting from "@/shared/components/Meeting";
import VideoCallConference from "@/shared/components/VideoCallConference";

import Dashboard from "../layouts/DashboardLayout";
import DefaultDashboard from "../pages/Dashboard";
import UsersDashboard from "../pages/Dashboard/Users";
import Docs from "../pages/Spaces/Docs";
import Members from "../pages/Spaces/Members";
import Tasks from "../pages/Spaces/Tasks";
import { useManagerMeetingsQuery } from "@/queries/managers/meetings/useManagerMeetingQuery";
import Profile from "@/shared/pages/Profile";
import { ChatLayout } from "@/shared/components/PersonalChats/chat-layout";
import { useManagerPeerChatsQuery } from "@/queries/managers/p2pchat/useManagerPeerChatsQuery";
import { useManagerPeerMessagesQuery } from "@/queries/managers/p2pMessage/useManagerPeerMessageQuery";
import { CalendarEvents } from "@/shared/components/Calander/CalanderPage";
import { useManagerEventsQuery } from "@/queries/managers/events/useManageEventQuery";

const ManagerRoutes: React.FC = () => {
  const manager = useSelector((state: RootState) => state.manager);
  return (
    <>
      <ManagerContextProvider>
        <Routes>
          <Route
            path="dashboard"
            element={<PrivateRoute Component={Dashboard} role="manager" />}
          >
            <Route index element={<DefaultDashboard />}></Route>
            <Route path="users" element={<UsersDashboard />}></Route>
            <Route
              path="chat"
              element={
                <ChatLayout
                  navCollapsedSize={8}
                  defaultLayout={undefined}
                  user={{ ...manager, role: "manager" }}
                  usePeerChatQuery={useManagerPeerChatsQuery}
                  usePeerMessageQuery={useManagerPeerMessagesQuery}
                />
              }
            ></Route>
            <Route path="spaces/:spaceid">
              <Route path="members" element={<Members />}></Route>
              <Route path="tasks" element={<Tasks />}></Route>
              <Route
                path="chat"
                element={
                  <Chat
                    useChatQuery={useManagerChatsQuery}
                    user={{ ...manager, role: "manager" }}
                    useSpaceQuery={useManagerSpacesByIdQuery}
                  />
                }
              ></Route>
              <Route path="docs" element={<Docs />}></Route>
              <Route
                path="meeting"
                element={
                  <Meeting
                    user={{
                      ...manager,
                      role: "manager",
                      companyId: manager.company.id,
                    }}
                    useMeetingsQuery={useManagerMeetingsQuery}
                  />
                }
              ></Route>
              <Route
                path="call"
                element={
                  <VideoCallConference
                    user={{ ...manager, role: "manager" }}
                    useMeetingsQuery={useManagerMeetingsQuery}
                  />
                }
              ></Route>
            </Route>
            <Route
              path="profile"
              element={<Profile id={manager.id} role="manager" />}
            ></Route>
            <Route
              path="calendar"
              element={
                <CalendarEvents
                  useEventsQuery={useManagerEventsQuery}
                  user={{ ...manager, role: "manager" }}
                />
              }
            ></Route>
          </Route>
        </Routes>
      </ManagerContextProvider>
    </>
  );
};

export default ManagerRoutes;
