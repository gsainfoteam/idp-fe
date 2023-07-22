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
import Swal from "sweetalert2";

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
    (async () => {
      try {
        const url = new globalThis.URL(redirectUri);
        const { code } = await authorize({
          client_id: clientId,
          redirect_uri: redirectUri,
          state,
          scope,
        });
        url.searchParams.append("code", code);
        if (state) url.searchParams.append("state", state);
        window.location.href = url.toString();
      } catch (e) {
        console.error(e);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: t("authorize.error"),
        });
      }
    })();
  }, [clientId, navigate, redirectUri, scope, state, t, user]);

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
