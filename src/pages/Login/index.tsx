import { useTranslation } from "react-i18next";
import { useHref, useLocation } from "react-router";
import Input from "src/components/Input";
import Logo from "src/components/Logo";

import {
  Container,
  FindPassword,
  Form,
  Links,
  LoginButton,
  Register,
} from "./styles";
import useLogin from "./useLogin";

const Login = () => {
  const { t } = useTranslation();
  const { handleSubmit, loading } = useLogin();
  const href = useHref(useLocation());

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
            search: new URLSearchParams({ redirect: href }).toString(),
          }}
        >
          {t("findPassword.action")}
        </FindPassword>
        |
        <Register
          to={{
            pathname: "/register",
            search: new URLSearchParams({ redirect: href }).toString(),
          }}
        >
          {t("register.action")}
        </Register>
      </Links>
    </Container>
  );
};

export default Login;
