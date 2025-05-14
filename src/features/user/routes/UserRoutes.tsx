import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import PrivateRoute from "@/hoc/PrivateRoute";
import { useUserChatsQuery } from "@/queries/users/chats/useChatQuery";
import { useUserSpaceBySpaceIdQuery } from "@/queries/users/spaces/useSpaceBySpaceIdQuery";
import { RootState } from "@/redux/store/appStore";
import Chat from "@/shared/components/Chat";

import Dashboard from "../layouts/DashboardLayout";
import DefaultDashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Docs from "../pages/Spaces/Docs";
import { Members } from "../pages/Spaces/Members";
import { Tasks } from "../pages/Spaces/Tasks";
import ProfilePage from "../pages/ProfilePage";

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
                  user={user}
                  useChatQuery={useUserChatsQuery}
                  useSpaceQuery={useUserSpaceBySpaceIdQuery}
                />
              }
            ></Route>
          </Route>
          <Route path="profile" Component={Profile}></Route>
          <Route path="profiles" Component={ProfilePage}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default UserRoutes;
