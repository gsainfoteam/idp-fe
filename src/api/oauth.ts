import api from ".";

export const authorize = (payload: {
  client_id: string;
  scope: string;
  redirect_uri: string;
  nonce?: string;
  response_type: string;
}) => api.post("/idp/authorize", payload).then(({ data }) => data);
