import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Landing from "src/pages/Landing";
import Register from "src/pages/Register";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
