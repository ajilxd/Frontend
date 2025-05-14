import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { ManagerContextProvider } from "@/context/ManagerContextProvider";
import PrivateRoute from "@/hoc/PrivateRoute";
import { useManagerChatsQuery } from "@/queries/managers/chats/useChatQuery";
import { RootState } from "@/redux/store/appStore";
import Chat from "@/shared/components/Chat";

import Dashboard from "../layouts/DashboardLayout";
import DefaultDashboard from "../pages/Dashboard";
import UsersDashboard from "../pages/Dashboard/Users";
import Docs from "../pages/Spaces/Docs";
import Members from "../pages/Spaces/Members";
import Tasks from "../pages/Spaces/Tasks";

import { useManagerSpacesByIdQuery } from "@/queries/managers/spaces/useManagerSpaceByIdQuery";

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
            <Route path="spaces/:spaceid">
              <Route path="members" element={<Members />}></Route>
              <Route path="tasks" element={<Tasks />}></Route>
              <Route
                path="chat"
                element={
                  <Chat
                    useChatQuery={useManagerChatsQuery}
                    user={manager}
                    useSpaceQuery={useManagerSpacesByIdQuery}
                  />
                }
              ></Route>
              <Route path="docs" element={<Docs />}></Route>
            </Route>
          </Route>
        </Routes>
      </ManagerContextProvider>
    </>
  );
};

export default ManagerRoutes;
