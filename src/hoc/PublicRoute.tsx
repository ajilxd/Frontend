import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { RootState } from "@/redux/store/appStore";

interface PrivateRouteProps {
  Component: React.ElementType;
  role: string;
}

const PublicRoute: React.FC<PrivateRouteProps> = ({ Component, role }) => {
  const ownerData = useSelector((state: RootState) => state.owner);
  const adminData = useSelector((state: RootState) => state.admin);
  console.log(role);
  console.log(ownerData);
  switch (role) {
    case "owner":
      return ownerData.isAuthenticated ? (
        <Navigate to="/owner/dashboard" />
      ) : (
        <Component />
      );

    case "admin":
      return adminData.isAuthenticated ? (
        <Navigate to="/admin/dashboard" />
      ) : (
        <Component />
      );

    default:
      throw new Error(`Unexpected role: ${role}`);
  }
};

export default PublicRoute;
