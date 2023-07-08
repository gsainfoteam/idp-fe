import { useTranslation } from "react-i18next";
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

const Landing = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Logo />
      <Form>
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
        <LoginButton type="submit">{t("login")}</LoginButton>
      </Form>
    </Container>
  );
};

export default Landing;
