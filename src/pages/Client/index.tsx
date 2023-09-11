import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  changeClientName as changeClientData,
  resetClientSecret,
  useClient,
} from "src/api/client";
import { isNotConsentRequiredScope, Scope } from "src/utils/schema";
import Swal from "sweetalert2";

const isValidUrl = (url: string) => {
  try {
    return Boolean(new URL(url));
  } catch (e) {
    return false;
  }
};

const ClientPage = () => {
  const { state } = useLocation();
  const secret = (state?.client_secret ??
    "refresh to get new secret") as string;
  const { uuid: _uuid } = useParams();
  const uuid = _uuid ?? "";
  const { data: client } = useClient(uuid);
  const navigate = useNavigate();
  const [urls, setUris] = useState<string[]>([]);
  const [scopes, setScopes] = useState<string[]>([]);

  const addUri = () => setUris((prev) => [...prev, ""]);
  const removeUri = (index: number) =>
    setUris((prev) => prev.filter((_, i) => i !== index));

  useEffect(() => {
    if (!client) return;
    setUris(client.urls);
    setScopes(client.grantScopes);
  }, [client]);

  const handleChangeSecret = async () => {
    const result = await resetClientSecret(uuid);
    navigate(".", { state: result });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!urls.every(isValidUrl)) {
      return Swal.fire({
        icon: "error",
        title: "잘못된 URL",
        text: "URL 형식이 잘못되었습니다.",
      });
    }

    await changeClientData(uuid, {
      name: e.currentTarget.clientName.value,
      urls: urls,
    });
    navigate(".");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>client id: {client?.id}</label>
      </div>
      <div>
        <label>
          client name:
          <input type="text" defaultValue={client?.name} name="clientName" />
        </label>
      </div>
      <div>
        <label>
          client secret: <code>{secret}</code>
        </label>
      </div>
      <br />
      <div>
        <div>
          allowed redirect uri list:
          <button type="button" onClick={addUri}>
            추가
          </button>
        </div>
        <ul>
          {urls?.map((uri, index) => (
            <li key={index}>
              <input
                type="text"
                value={uri}
                onChange={(e) => {
                  const value = e.currentTarget.value;
                  setUris((prev) =>
                    prev.map((v, i) => (i === index ? value : v)),
                  );
                }}
              />
              <button type="button" onClick={() => removeUri(index)}>
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>
      <br />
      <div>
        granted scopes:
        {client?.grantScopes?.join(", ")}
        <div style={{ border: "1px solid black" }}>
          <ul>
            {Scope.options.map((scope) => (
              <li key={scope}>
                <label>
                  <input
                    type="checkbox"
                    name={`scopes-${scope}`}
                    checked={
                      isNotConsentRequiredScope(scope) || scopes.includes(scope)
                    }
                    onChange={(e) =>
                      e.currentTarget.checked
                        ? setScopes((prev) => [...prev, scope])
                        : setScopes((prev) => prev.filter((v) => v !== scope))
                    }
                    disabled={isNotConsentRequiredScope(scope)}
                  />
                  {scope}
                </label>
              </li>
            ))}
          </ul>
          <button type="button">추가 권한 요청</button>
        </div>
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
