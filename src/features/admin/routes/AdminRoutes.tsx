import { Route, Routes } from "react-router-dom";

import PrivateRoute from "@/hoc/PrivateRoute";
import PublicRoute from "@/hoc/PublicRoute";

import AdminDashboardLayout from "../layouts/AdminDashboardLayout";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/Dashboard";
import OwnersTable from "../pages/Dashboard/Owners";
import UserTable from "../pages/UserManagement";
import Transactions from "../pages/TransactionManagement";
import Subscription from "../pages/Subscriptions";
import AddSubscriptionForm from "../pages/NewSubscription";

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
            path="new-subscription"
            element={<AddSubscriptionForm />}
          ></Route>
          <Route path="owners" element={<OwnersTable />}></Route>
          <Route path="users" element={<UserTable />}></Route>
          <Route path="transactions" element={<Transactions />}></Route>
          <Route path="subscriptions" element={<Subscription />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default AdminRoutes;
