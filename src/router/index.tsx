import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "src/pages/Landing";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
