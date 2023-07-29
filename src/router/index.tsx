import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useHref,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "src/api/auth";
import Authorize from "src/pages/Authorize";
import ClientPage from "src/pages/Client";
import ClientListPage from "src/pages/ClientList";
import ClientNewPage from "src/pages/ClientNew";
import FindPassword from "src/pages/FindPassword";
import Landing from "src/pages/Landing";
import Login from "src/pages/Login";
import Register from "src/pages/Register";

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
        <Route path="clients">
          <Route index element={<ClientListPage />} />
          <Route path="new" element={<ClientNewPage />} />
          <Route path=":uuid" element={<ClientPage />} />
        </Route>
      </Route>
      <Route path="/authorize" element={<Authorize />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const AuthNotRequiredRouters = () => {
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";
  const { user } = useAuth({ redirectIfFound: true, redirectUrl });
  if (user === undefined) return null;

  return (
    <Routes>
      <Route element={<SubPageLayout />}>
        <Route index element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="find-password" element={<FindPassword />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/auth/*" element={<AuthNotRequiredRouters />} />
      <Route path="/*" element={<AuthRequiredRouters />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
