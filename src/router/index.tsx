import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Authorize from "src/pages/Authorize";
import FindPassword from "src/pages/FindPassword";
import Landing from "src/pages/Landing";
import Login from "src/pages/Login";
import Register from "src/pages/Register";

import SubPageLayout from "./SubPageLayout";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route element={<SubPageLayout />}>
        <Route path="/register" element={<Register />} />
        <Route path="/find-password" element={<FindPassword />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/authorize" element={<Authorize />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
