import { Route, Routes } from "react-router-dom";

import PrivateRoute from "@/hoc/PrivateRoute";
import PublicRoute from "@/hoc/PublicRoute";

import AdminDashboardLayout from "../layouts/AdminDashboardLayout";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/Dashboard";
import OwnersTable from "../pages/Dashboard/Owners";
import SubscriptionDashboard from "../pages/Dashboard/Subscription";

const AdminRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route
          path="signin"
          element={<PublicRoute Component={AdminLogin} role="admin" />}
        ></Route>
        <Route
          path="dashboard"
          element={
            <PrivateRoute Component={AdminDashboardLayout} role="admin" />
          }
        >
          <Route index element={<AdminDashboard />}></Route>
          <Route
            path="subscriptions"
            element={<SubscriptionDashboard />}
          ></Route>
          <Route path="owners" element={<OwnersTable />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default AdminRoutes;
