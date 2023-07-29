import {
  Navigate,
  Route,
  Routes,
  useHref,
  useLocation,
} from "react-router-dom";
import { useAuth } from "src/api/auth";
import Authorize from "src/pages/Authorize";
import Landing from "src/pages/Landing";
import Register from "src/pages/Register";

import ClientRoutes from "./ClientRoutes";
import SubPageLayout from "./SubPageLayout";

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
        <Route index element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="clients/*" element={<ClientRoutes />} />
      </Route>
      <Route path="/authorize" element={<Authorize />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AuthRequiredRouters;
