import { useEffect } from "react";
import { To, useNavigate } from "react-router";
import { saveToken } from "src/utils/token";
import useSWR from "swr";

import api from ".";
import { getUserInfo } from "./user";

interface LoginForm {
  email: string;
  password: string;
}

/**
 * login and get access token
 * @param LoginForm login data
 * @returns auth code
 */
const login = ({ email, password }: LoginForm) =>
  api.post("/idp/login", { email, password }).then(({ data }) => ({
    accessToken: data.access_token as string,
  }));

export const refreshToken = () =>
  api
    .post("/idp/refresh", undefined, { _retry: true } as any)
    .then(({ data }) => ({
      accessToken: data.access_token as string,
    }));

const logout = () => api.post("/idp/logout");

export const useAuth = ({
  redirectUrl = undefined as To | undefined,
  redirectIfFound = false,
} = {}) => {
  const { data: user, mutate } = useSWR("user", () =>
    getUserInfo().catch(() => null),
  );
  const navigate = useNavigate();

  const userLogin = async (payload: Parameters<typeof login>[0]) => {
    const { accessToken } = await login(payload);
    saveToken({ accessToken });
    await mutate();
  };

  const userLogout = async () => {
    await logout();
    saveToken(null);
    await mutate(null);
  };

  useEffect(() => {
    if (user === undefined || !redirectUrl) return;
    if ((redirectIfFound && user) || (!redirectIfFound && !user)) {
      navigate(redirectUrl);
    }
  }, [redirectIfFound, redirectUrl, user, navigate]);

  return { login: userLogin, logout: userLogout, user };
};
