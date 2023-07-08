import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import FindPassword from "src/pages/FindPassword";
import Landing from "src/pages/Landing";
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
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
