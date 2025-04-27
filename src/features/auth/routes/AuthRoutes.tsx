import { Route, Routes } from "react-router-dom";

import LoginByEmail from "../pages/LoginByEmail";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login-email" element={<LoginByEmail />}></Route>
    </Routes>
  );
};

export default AuthRoutes;
