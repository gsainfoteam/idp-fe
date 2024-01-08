import { Scopes } from "src/utils/schema";

import api from ".";

export const getClientInformation = (clientId: string) =>
  api
    .get<{
      id: string;
      name: string;
      recent_consent?: string[];
    }>(`/idp/clients/${clientId}`)
    .then(({ data }) => ({
      id: data.id,
      name: data.name,
      recentConsent: data.recent_consent as Scopes,
    }));

export const authorize = ({
  clientId,
  redirectUri,
  responseTypes,
  scopes,
  nonce,
}: {
  clientId: string;
  scopes: string[];
  redirectUri: string;
  nonce?: string;
  responseTypes: string[];
}) =>
  api
    .post("/oauth/authorize", {
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: responseTypes.join(" "),
      scope: scopes.join(" "),
      nonce,
    })
    .then(({ data }) => data);
