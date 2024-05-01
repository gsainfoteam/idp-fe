import { Scopes } from "src/utils/schema";
import useSWR from "swr";

import api from ".";

interface Client {
  uuid: string;
  id: string;
  name: string;
  urls: string[];
  grantScopes: string[];
}

export const getClientPublicInformation = (clientId: string) =>
  api
    .get<{
      id: string;
      uuid: string;
      name: string;
      recentConsent?: string[];
    }>(`/client/${clientId}/public`)
    .then(({ data }) => ({
      id: data.id,
      uuid: data.uuid,
      name: data.name,
      recentConsent: data.recentConsent as Scopes,
    }));

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
    .patch<{ clientSecret: string }>(`/client/${uuid}/reset-secret`)
    .then(({ data }) => data);

export const changeClientName = (
  uuid: string,
  payload: { name: string; urls: string[] },
) =>
  api
    .patch<{ name: string }>(`/client/${uuid}`, payload)
    .then(({ data }) => data);
