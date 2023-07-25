import api from ".";

export const getClientInformation = (clientId: string) =>
  api
    .get<{
      id: string;
      name: string;
      recentConsent?: string[];
    }>(`/idp/clients/${clientId}`)
    .then(({ data }) => data);

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
    .post("/idp/authorize", {
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: responseTypes.join(" "),
      scope: scopes.join(" "),
      nonce,
    })
    .then(({ data }) => data);
