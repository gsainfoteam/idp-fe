import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AuthNotRequiredRouters = lazy(() => import("./AuthNotRequiredRoutes"));
const AuthRequiredRouters = lazy(() => import("./AuthRequiredRoutes"));

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/auth/*" element={<AuthNotRequiredRouters />} />
      <Route path="/*" element={<AuthRequiredRouters />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
