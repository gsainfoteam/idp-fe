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

export const createClient = (payload: {
  name: string;
  urls: string[];
  id: string;
}) => api.post<Client>("/clients", payload).then(({ data }) => data);
