import { useClients } from "src/api/client";

const ClientListPage = () => {
  const { data: clients } = useClients();
  return <>{JSON.stringify(clients)}</>;
};

export default ClientListPage;
