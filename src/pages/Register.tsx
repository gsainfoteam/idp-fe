import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import Button from "src/components/Button";
import Field from "src/components/Field";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Group = styled.div`
  margin: 0.75rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Row = styled.div`
  display: flex;
  gap: 1.25rem;

  > * {
    flex: 1;
  }
`;

const BackLink = styled(Link)`
  color: #959595;
  font-size: 0.875rem;
`;

const useRegister = () => {
  const [searchParams] = useSearchParams();
  const loginPageUri = searchParams.get("redirect");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return { handleSubmit, loginPageUri };
};

const Register = () => {
  const { t } = useTranslation();
  const { handleSubmit, loginPageUri } = useRegister();

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Group>
          <Field
            label={t("email.label")}
            placeholder={t("email.placeholder")}
            type="email"
            autoComplete="email"
            required
            name="email"
          >
            <Button>{t("email.verify")}</Button>
          </Field>
          <Field
            label={t("verificationCode.label")}
            placeholder={t("verificationCode.placeholder")}
            type="text"
            autoComplete="one-time-code"
            required
            name="verificationCode"
          >
            <Button>{t("verificationCode.verify.action")}</Button>
          </Field>
        </Group>
        <Group>
          <Field
            label={t("password.label")}
            placeholder={t("password.placeholder")}
            type="password"
            autoComplete="new-password"
            required
            name="password"
          />
          <Field
            label={t("passwordConfirm.label")}
            placeholder={t("passwordConfirm.placeholder")}
            type="password"
            autoComplete="new-password"
            required
            name="passwordConfirm"
          />
        </Group>
        <Group>
          <Row>
            <Field
              label={t("name.label")}
              placeholder={t("name.placeholder")}
              type="text"
              autoComplete="name"
              required
              name="realName"
            />
            <Field
              label={t("studentId.label")}
              placeholder={t("studentId.placeholder")}
              type="text"
              required
              name="studentId"
            />
          </Row>
          <Field
            label={t("phoneNumber.label")}
            placeholder={t("phoneNumber.placeholder")}
            type="tel"
            autoComplete="tel-national"
            required
            name="phoneNumber"
          />
        </Group>
      </Form>
      {loginPageUri && (
        <BackLink to={loginPageUri}>{t("register.back")}</BackLink>
      )}
    </Container>
  );
};

export default Register;
