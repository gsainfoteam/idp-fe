import { useLocation, useNavigate, useParams } from "react-router";
import { resetClientSecret, useClient } from "src/api/client";

const ClientPage = () => {
  const { state } = useLocation();
  const secret = (state?.client_secret ??
    "refresh to get new secret") as string;
  const { uuid: _uuid } = useParams();
  const uuid = _uuid ?? "";
  const { data: client } = useClient(uuid);
  const navigate = useNavigate();

  const handleChangeSecret = async () => {
    const result = await resetClientSecret(uuid);
    navigate(".", { state: result });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          client id:
          <input type="text" value={client?.id} disabled />
        </label>
      </div>
      <div>
        <label>
          client name:
          <input type="text" value={client?.name} name="clientName" />
        </label>
      </div>
      <div>
        <label>
          client secret:
          <input type="text" value={secret} disabled />
        </label>
      </div>
      <div>
        <button type="button" onClick={handleChangeSecret}>
          client secret 초기화
        </button>
        <button type="submit">수정</button>
      </div>
    </form>
  );
};

export default ClientPage;
