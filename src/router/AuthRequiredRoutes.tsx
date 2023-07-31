import { lazy, Suspense } from "react";
import {
  Navigate,
  Route,
  Routes,
  useHref,
  useLocation,
} from "react-router-dom";
import { useAuth } from "src/api/auth";
import Authorize from "src/pages/Authorize";
import Profile from "src/pages/Profile";
import Register from "src/pages/Register";
import WithdrawPage from "src/pages/Withdraw";

import SubPageLayout from "./SubPageLayout";

const ClientRoutes = lazy(() => import("./ClientRoutes"));

const AuthRequiredRouters = () => {
  const href = useHref(useLocation());
  const { user } = useAuth({
    redirectUrl: {
      pathname: "/auth/login",
      search: new URLSearchParams({ redirect: href }).toString(),
    },
  });
  if (user === undefined) return null;

  return (
    <Routes>
      <Route path="/" element={<SubPageLayout />}>
        <Route path="profile">
          <Route index element={<Profile />} />
          <Route path="withdraw" element={<WithdrawPage />} />
        </Route>
        <Route path="register" element={<Register />} />
        <Route
          path="clients/*"
          element={
            <Suspense fallback={<></>}>
              <ClientRoutes />
            </Suspense>
          }
        />
      </Route>
      <Route path="/authorize" element={<Authorize />} />
      <Route index element={<Navigate to="/profile" replace />} />
      <Route path="*" element={<Navigate to="/profile" replace />} />
    </Routes>
  );
};

export default AuthRequiredRouters;
