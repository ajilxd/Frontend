import { Route, Routes } from "react-router-dom";

import PrivateRoute from "@/hoc/PrivateRoute";

import Dashboard from "../layouts/DashboardLayout";
import DefaultDashboard from "../pages/Dashboard";

const UserRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route
          path="dashboard"
          element={<PrivateRoute Component={Dashboard} role="user" />}
        >
          <Route index element={<DefaultDashboard />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default UserRoutes;
