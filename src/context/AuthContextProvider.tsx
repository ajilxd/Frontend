import { useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";


import {
  userApi,
  ownerApi,
  managerApi,
  adminApi,
  setupInterceptors,
} from "../axios/index";
import { AuthContext } from "./AuthContext";


export default function AuthContextProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [interceptorReady, setInterceptorReady] = useState(false);

  useEffect(() => {
    setupInterceptors({ apiInstance:userApi, role: "user", navigate });
    setupInterceptors({ apiInstance: ownerApi, role: "owner", navigate });
    setupInterceptors({ apiInstance: managerApi, role: "manager", navigate });
    setupInterceptors({ apiInstance: adminApi, role: "admin", navigate });

    setInterceptorReady(true);
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ interceptorReady }}>
      {children}
    </AuthContext.Provider>
  );
}
