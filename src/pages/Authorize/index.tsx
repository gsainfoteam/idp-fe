import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useHref,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "src/api/auth";
import { authorize } from "src/api/oauth";
import Logo from "src/components/Logo";
import styled from "styled-components";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  padding: 0 1.25rem;
  text-align: center;
`;

const useAuthorize = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const {
    client_id: clientId,
    redirect_uri: redirectUri,
    state,
    scope,
    nonce,
    response_type: responseType,
  } = Object.fromEntries(searchParams.entries());
  const href = useHref(useLocation());
  const { user } = useAuth({
    redirectUrl: {
      pathname: "/login",
      search: new URLSearchParams({ redirect: href }).toString(),
    },
  });
  const navigate = useNavigate();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!user) return;
    if (!clientId) return setError("client_id is required");
    if (!redirectUri) return setError("redirect_uri is required");
    if (!scope) return setError("scope is required");
    if (!responseType) return setError("response_type is required");
    const isImplicitFlow =
      responseType.includes("token") || responseType.includes("id_token");
    (async () => {
      try {
        const url = new globalThis.URL(redirectUri);
        const result = await authorize({
          client_id: clientId,
          redirect_uri: redirectUri,
          response_type: responseType,
          nonce,
          scope,
        });

        const searchParams = new URLSearchParams();
        Object.entries(result).forEach(([key, value]) =>
          searchParams.append(key, value as string),
        );
        if (state) searchParams.append("state", state);
        if (isImplicitFlow) {
          url.hash = searchParams.toString();
        } else {
          url.search = searchParams.toString();
        }
        window.location.href = url.toString();
      } catch (e) {
        if (e instanceof AxiosError) {
          setError(e.response?.data.message ?? e.message);
          return;
        }
        setError("unknown error");
      }
    })();
  }, [
    clientId,
    navigate,
    nonce,
    redirectUri,
    responseType,
    scope,
    state,
    t,
    user,
  ]);

  return { error };
};

const Authorize = () => {
  const { error } = useAuthorize();

  if (error) {
    return <Container>error: {error}</Container>;
  }

  return (
    <Container>
      <Logo />
    </Container>
  );
};

export default Authorize;
