import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import { login } from "src/api/auth";
import Button from "src/components/Button";
import Input from "src/components/Input";
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  margin: 2rem 0 1.25rem;
`;

const LoginButton = styled(Button)`
  margin-top: 0.625rem;
`;

const Links = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 0.375rem;

  &,
  * {
    color: #959595;
    text-decoration: none;
    font-size: 0.875rem;
  }
`;

const FindPassword = styled(Link)``;

const Register = styled(Link)`
  color: var(--color-primary);
`;

const useLanding = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const { client_id: clientId, redirect_uri: redirectUri } = Object.fromEntries(
    searchParams.entries(),
  );
  const isValid = !!clientId && !!redirectUri;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget.email as HTMLInputElement;
    const password = event.currentTarget.password as HTMLInputElement;

    try {
      setLoading(true);
      const authCode = await login({
        email: email.value,
        password: password.value,
        clientId,
        redirectUri,
      });
      window.location.href = `${redirectUri}?code=${authCode}`;
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("login.error"),
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading, isValid };
};

const Landing = () => {
  const { t } = useTranslation();
  const { handleSubmit, loading, isValid } = useLanding();

  if (!isValid) {
    return <Container>invalid client_id or redirect_uri</Container>;
  }

  return (
    <Container>
      <Logo />
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder={t("email.placeholder")}
          autoComplete="email"
          name="email"
          required
        />
        <Input
          type="password"
          placeholder={t("password.placeholder")}
          autoComplete="current-password"
          name="password"
          required
        />
        <LoginButton type="submit" disabled={loading}>
          {t("login.action")}
        </LoginButton>
      </Form>
      <Links>
        <FindPassword
          to={{
            pathname: "/find-password",
            search: new URLSearchParams({
              redirect: window.location.href,
            }).toString(),
          }}
        >
          {t("findPassword.action")}
        </FindPassword>
        |
        <Register
          to={{
            pathname: "/register",
            search: new URLSearchParams({
              redirect: window.location.href,
            }).toString(),
          }}
        >
          {t("register.action")}
        </Register>
      </Links>
    </Container>
  );
};

export default Landing;
