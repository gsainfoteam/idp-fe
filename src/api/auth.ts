import api from ".";

interface LoginForm {
  email: string;
  password: string;
  clientId: string;
  redirectUri: string;
}

/**
 * login and get auth code
 * @param LoginForm login data
 * @returns auth code
 */
export const login = ({ email, password, clientId, redirectUri }: LoginForm) =>
  api
    .post(
      "/idp/login",
      { user_email_id: email, user_password: password },
      { params: { client_id: clientId, redirect_uri: redirectUri } },
    )
    .then((res) => res.data.auth_code as string);
