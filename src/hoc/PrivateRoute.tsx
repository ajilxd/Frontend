import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { RootState } from "@/redux/store/appStore";

interface PrivateRouteProps {
  Component: React.ElementType;
  role: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ Component, role }) => {
  const ownerData = useSelector((state: RootState) => state.owner);
  const adminData = useSelector((state: RootState) => state.admin);
  const managerData = useSelector((state: RootState) => state.manager);
  const userData = useSelector((state: RootState) => state.user);

  switch (role) {
    case "owner":
      return ownerData.isAuthenticated ? (
        <Component />
      ) : (
        <Navigate to="/owner/signin" />
      );

    case "admin":
      return adminData.isAuthenticated ? (
        <Component />
      ) : (
        <Navigate to="/admin/signin" />
      );
    case "manager":
      return managerData.isAuthenticated ? (
        <Component />
      ) : (
        <Navigate to="/auth/login-email" />
      );

    case "user":
      return userData.isAuthenticated ? (
        <Component />
      ) : (
        <Navigate to="/auth/login-email" />
      );
    default:
      throw new Error(`Unexpected role: ${role}`);
  }
};

export default PrivateRoute;
