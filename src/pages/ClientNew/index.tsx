import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { createClient } from "src/api/client";
import Swal from "sweetalert2";

const ClientNewPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    (async () => {
      try {
        const client = await createClient({
          id: e.currentTarget.clientId.value,
          name: e.currentTarget.clientName.value,
          urls: [],
        });
        navigate(`/clients/${client.uuid}`, {
          state: { client },
        });
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: (e as AxiosError).message,
        });
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <div>
      <h1>Client 생성하기</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Client id:
            <input type="text" name="clientId" required />
          </label>
        </div>
        <div>
          <label>
            Client name:
            <input type="text" name="clientName" required />
          </label>
        </div>
        <div>
          <button type="submit" disabled={loading}>
            생성
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientNewPage;
