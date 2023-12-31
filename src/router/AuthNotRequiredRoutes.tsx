import { Navigate, Route, Routes, useSearchParams } from "react-router-dom";
import { useAuth } from "src/api/auth";
import FindPassword from "src/pages/FindPassword";
import Login from "src/pages/Login";
import Register from "src/pages/Register";

import SubPageLayout from "./SubPageLayout";

const AuthNotRequiredRouters = () => {
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";
  const { user } = useAuth({ redirectIfFound: true, redirectUrl });
  if (user === undefined) return null;

  return (
    <Routes>
      <Route element={<SubPageLayout />}>
        <Route path="register" element={<Register />} />
        <Route path="find-password" element={<FindPassword />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
};

export default AuthNotRequiredRouters;
