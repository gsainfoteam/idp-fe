import { Route, Routes } from "react-router";
import ClientPage from "src/pages/Client";
import ClientListPage from "src/pages/ClientList";
import ClientNewPage from "src/pages/ClientNew";

const ClientRoutes = () => (
  <Routes>
    <Route index element={<ClientListPage />} />
    <Route path="new" element={<ClientNewPage />} />
    <Route path=":uuid" element={<ClientPage />} />
  </Routes>
);

export default ClientRoutes;
