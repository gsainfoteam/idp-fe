import api from ".";

export const authorize = (payload: {
  client_id: string;
  scope: string;
  redirect_uri: string;
  state?: string;
}) =>
  api.post("/idp/authorize", payload).then(({ data }) => ({
    code: data.code as string,
  }));
