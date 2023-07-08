import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { login } from "src/api/auth";
import Button from "src/components/Button";
import Input from "src/components/Input";
import Logo from "src/components/Logo";
import styled from "styled-components";

const Container = styled.div`
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

const useLanding = () => {
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
        />
        <Input
          type="password"
          placeholder={t("password.placeholder")}
          autoComplete="current-password"
          name="password"
        />
        <LoginButton type="submit" disabled={loading}>
          {t("login")}
        </LoginButton>
      </Form>
    </Container>
  );
};

export default Landing;
