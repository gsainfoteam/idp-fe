import api from ".";

interface LoginForm {
  email: string;
  password: string;
}

/**
 * login and get access token
 * @param LoginForm login data
 * @returns auth code
 */
export const login = ({ email, password }: LoginForm) =>
  api
    .post("/idp/login", { user_email_id: email, user_password: password })
    .then((res) => res.data.access_token as string);
