import { Link } from "react-router-dom";
import { useClients } from "src/api/client";

const ClientCard = ({
  uuid,
  name,
  id,
}: {
  uuid: string;
  name: string;
  id: string;
}) => (
  <div>
    <Link to={`/clients/${uuid}`}>{name}</Link>
    <div>id: {id}</div>
  </div>
);

const ClientListPage = () => {
  const { data: clients } = useClients();
  return (
    <div>
      <ul>
        {clients?.map((client) => (
          <li key={client.uuid}>
            <ClientCard {...client} />
          </li>
        ))}
      </ul>
      <Link to="/clients/new">create new client</Link>
    </div>
  );
};

export default ClientListPage;
