import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import PrivateRoute from "@/hoc/PrivateRoute";
import { useUserChatsQuery } from "@/queries/users/chats/useChatQuery";
import { useUserMeetingsQuery } from "@/queries/users/meetings/useUserMeetingQuery";
import { useUserSpaceBySpaceIdQuery } from "@/queries/users/spaces/useSpaceBySpaceIdQuery";
import { RootState } from "@/redux/store/appStore";
import Chat from "@/shared/components/Chat";
import Meeting from "@/shared/components/Meeting";
import VideoCallConference from "@/shared/components/VideoCallConference";
import Profile from "@/shared/pages/Profile";

import Dashboard from "../layouts/DashboardLayout";
import DefaultDashboard from "../pages/Dashboard";
import Docs from "../pages/Spaces/Docs";
import { Members } from "../pages/Spaces/Members";
import { Tasks } from "../pages/Spaces/Tasks";
import { ChatLayout } from "@/shared/components/PersonalChats/chat-layout";
import { useUserCompanyMembersQuery } from "@/queries/users/company/useUserCompanyMembersQuery";

const UserRoutes: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  return (
    <>
      <Routes>
        <Route
          path="dashboard"
          element={<PrivateRoute Component={Dashboard} role="user" />}
        >
          <Route index element={<DefaultDashboard />}></Route>
          <Route path="spaces/:spaceid">
            <Route path="members" element={<Members />}></Route>
            <Route path="tasks" element={<Tasks />}></Route>
            <Route path="docs" element={<Docs />}></Route>
            <Route
              path="chat"
              element={
                <Chat
                  user={{ ...user, role: "user" }}
                  useChatQuery={useUserChatsQuery}
                  useSpaceQuery={useUserSpaceBySpaceIdQuery}
                />
              }
            ></Route>
            <Route
              path="meeting"
              element={
                <Meeting
                  user={{ ...user, role: "user", companyId: user.company.id! }}
                  useMeetingsQuery={useUserMeetingsQuery}
                />
              }
            ></Route>
            <Route
              path="call"
              element={
                <VideoCallConference
                  user={{ ...user, role: "user" }}
                  useMeetingsQuery={useUserMeetingsQuery}
                />
              }
            ></Route>
          </Route>

          <Route
            path="profile"
            element={<Profile role="user" id={user.id} />}
          ></Route>

          <Route
            path="chat"
            element={
              <ChatLayout
                navCollapsedSize={8}
                defaultLayout={undefined}
                user={{ ...user, role: "user" }}
              />
            }
          ></Route>
        </Route>
      </Routes>
    </>
  );
};

export default UserRoutes;
