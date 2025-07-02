import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  userApi,
  ownerApi,
  managerApi,
  adminApi,
  setupInterceptors,
} from "./.";
import { ReactNode } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    setupInterceptors({ apiInstance: userApi, role: "user", navigate });
    setupInterceptors({ apiInstance: ownerApi, role: "owner", navigate });
    setupInterceptors({ apiInstance: managerApi, role: "manager", navigate });
    setupInterceptors({ apiInstance: adminApi, role: "admin", navigate });
  }, [navigate]);

  return <>{children}</>;
}
