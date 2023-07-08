import { useTranslation } from "react-i18next";
import Button from "src/components/Button";
import Field from "src/components/Field";

import { BackLink, Container, Form, Group, Row, VerifiedText } from "./styles";
import useFindPassword from "./useFindPassword";

const FindPassword = () => {
  const { t } = useTranslation();
  const { handleSubmit, verifyLeftTime, verified, loginPageUri } =
    useFindPassword();
  const leftTimeString = `${Math.floor(verifyLeftTime / 60)
    .toString()
    .padStart(2, "0")}:${(verifyLeftTime % 60).toString().padStart(2, "0")}`;

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
            <Row narrow>
              <Button name="action" value="request" formNoValidate small>
                {t("email.verify.action")}
              </Button>
              {verifyLeftTime >= 0 && <span>{leftTimeString}</span>}
            </Row>
          </Field>
          <Field
            label={t("verificationCode.label")}
            placeholder={t("verificationCode.placeholder")}
            type="text"
            autoComplete="one-time-code"
            required
            name="verificationCode"
          >
            <Row narrow>
              <Button name="action" value="verify" formNoValidate outline small>
                {t("verificationCode.verify.action")}
              </Button>
              {verified && (
                <VerifiedText>
                  {t("verificationCode.verify.complete")}
                </VerifiedText>
              )}
            </Row>
          </Field>
        </Group>
        <Group>
          <Field
            label={t("findPassword.new.label")}
            placeholder={t("findPassword.new.placeholder")}
            type="password"
            autoComplete="new-password"
            required
            name="password"
          />
          <Field
            label={t("findPassword.newConfirm.label")}
            placeholder={t("findPassword.newConfirm.placeholder")}
            type="password"
            autoComplete="new-password"
            required
            name="passwordConfirm"
          />
        </Group>
        <Button>{t("findPassword.change.action")}</Button>
      </Form>
      {loginPageUri && (
        <BackLink to={loginPageUri}>{t("register.back")}</BackLink>
      )}
    </Container>
  );
};

export default FindPassword;
