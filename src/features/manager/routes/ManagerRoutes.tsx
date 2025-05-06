import { Route, Routes } from "react-router-dom";

import { ManagerContextProvider } from "@/context/ManagerContextProvider";
import PrivateRoute from "@/hoc/PrivateRoute";

import Dashboard from "../layouts/DashboardLayout";
import DefaultDashboard from "../pages/Dashboard";
import UsersDashboard from "../pages/Dashboard/Users";
import Members from "../pages/Spaces/Members";

const ManagerRoutes: React.FC = () => {
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
            </Route>
          </Route>
        </Routes>
      </ManagerContextProvider>
    </>
  );
};

export default ManagerRoutes;
