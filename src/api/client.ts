import useSWR from "swr";

import api from ".";

interface Client {
  uuid: string;
  id: string;
  name: string;
  urls: string[];
}

export const useClients = () =>
  useSWR("clients", () =>
    api.get<Client[]>("/clients").then(({ data }) => data),
  );

export const useClient = (uuid: string) =>
  useSWR(["clients", uuid], () =>
    api.get<Client>(`/clients/${uuid}`).then(({ data }) => data),
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
    }>("/clients", payload)
    .then(({ data }) => data);
