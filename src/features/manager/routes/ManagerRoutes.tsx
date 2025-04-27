import { Route, Routes } from "react-router-dom";

import PrivateRoute from "@/hoc/PrivateRoute";

import Dashboard from "../layouts/DashboardLayout";
import DefaultDashboard from "../pages/Dashboard";
import UsersDashboard from "../pages/Dashboard/Users";

const ManagerRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route
          path="dashboard"
          element={<PrivateRoute Component={Dashboard} role="manager" />}
        >
          <Route index element={<DefaultDashboard />}></Route>
          <Route path="users" element={<UsersDashboard />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default ManagerRoutes;
