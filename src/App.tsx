import { Route, Routes } from "react-router-dom";

import AdminRoutes from "./features/admin/routes/AdminRoutes";
import AuthRoutes from "./features/auth/routes/AuthRoutes";
import ManagerRoutes from "./features/manager/routes/ManagerRoutes";
import { OwnerRoutes } from "./features/owner/routes/OwnerRoutes";
import UserRoutes from "./features/user/routes/UserRoutes";
import LandingPage from "./shared/pages/LandingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="auth/*" element={<AuthRoutes />} />
      <Route path="admin/*" element={<AdminRoutes />} />
      <Route path="owner/*" element={<OwnerRoutes />} />
      <Route path="manager/*" element={<ManagerRoutes />} />
      <Route path="user/*" element={<UserRoutes />} />
    </Routes>
  );
}

export default App;
