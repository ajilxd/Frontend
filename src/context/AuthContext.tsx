import { createContext } from "react";

type AuthContextType = {
  interceptorReady: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  interceptorReady: false,
});
