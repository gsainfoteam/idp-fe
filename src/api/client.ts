import useSWR from "swr";

import api from ".";

interface Client {
  uuid: string;
  id: string;
  name: string;
  urls: string[];
  grantScopes: string[];
}

export const useClients = () =>
  useSWR("clients", () =>
    api.get<Client[]>("/client").then(({ data }) => data),
  );

export const useClient = (uuid: string) =>
  useSWR(["clients", uuid], () =>
    api.get<Client>(`/client/${uuid}`).then(({ data }) => data),
  );

export const createClient = (payload: {
  name: string;
  urls: string[];
  id: string;
}) =>
  api
    .post<{
      uuid: string;
      client_id: string;
      client_secret: string;
    }>("/client", payload)
    .then(({ data }) => data);

export const resetClientSecret = (uuid: string) =>
  api
    .post<{ client_secret: string }>(`/client/${uuid}/reset`)
    .then(({ data }) => data);

export const changeClientName = (
  uuid: string,
  payload: { name: string; urls: string[] },
) =>
  api
    .patch<{ name: string }>(`/client/${uuid}`, payload)
    .then(({ data }) => data);
