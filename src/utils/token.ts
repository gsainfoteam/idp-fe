const accessTokenKey = "_accessToken";

export const saveToken = (data: { accessToken: string } | null) => {
  if (!data) {
    globalThis.localStorage.removeItem(accessTokenKey);
    return;
  }
  globalThis.localStorage.setItem(accessTokenKey, data.accessToken);
};

export const loadToken = () => {
  const accessToken = globalThis.localStorage.getItem(accessTokenKey);
  if (!accessToken) return null;
  return { accessToken };
};
