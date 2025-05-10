import { Route, Routes } from "react-router-dom";

import PrivateRoute from "@/hoc/PrivateRoute";

import Dashboard from "../layouts/DashboardLayout";
import DefaultDashboard from "../pages/Dashboard";
import Chat from "../pages/Spaces/Chat";
import Profile from "../pages/Profile";
import Docs from "../pages/Spaces/Docs";
import { Members } from "../pages/Spaces/Members";
import { Tasks } from "../pages/Spaces/Tasks";

const UserRoutes: React.FC = () => {
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
            <Route path="chat" element={<Chat />}></Route>
          </Route>
          <Route path="profile" Component={Profile}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default UserRoutes;
