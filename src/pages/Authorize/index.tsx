import { useEffect } from "react";
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
  } = Object.fromEntries(searchParams.entries());
  const isValid = !!clientId && !!redirectUri;
  const href = useHref(useLocation());
  const { user } = useAuth({
    redirectUrl: {
      pathname: "/login",
      search: new URLSearchParams({ redirect: href }).toString(),
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isValid || !user) return;
    (async () => {
      try {
        console.log(redirectUri);
        const url = new globalThis.URL(redirectUri);
        const { code } = await authorize({
          client_id: clientId,
          redirect_uri: redirectUri,
          state,
          scope: "",
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
  }, [clientId, isValid, navigate, redirectUri, state, t, user]);

  return { isValid };
};

const Authorize = () => {
  const { isValid } = useAuthorize();

  if (!isValid) {
    return <Container>invalid client_id or redirect_uri</Container>;
  }

  return (
    <Container>
      <Logo />
    </Container>
  );
};

export default Authorize;
