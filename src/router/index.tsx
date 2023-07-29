import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthNotRequiredRouters from "./AuthNotRequiredRoutes";
import AuthRequiredRouters from "./AuthRequiredRoutes";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/auth/*" element={<AuthNotRequiredRouters />} />
      <Route path="/*" element={<AuthRequiredRouters />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
