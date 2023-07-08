import { useTranslation } from "react-i18next";
import Input from "src/components/Input";
import Logo from "src/components/Logo";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  margin: 2rem 0 1.25rem;
`;

const Landing = () => {
  const { t } = useTranslation();
  return (
    <div>
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
      </Form>
    </div>
  );
};

export default Landing;
