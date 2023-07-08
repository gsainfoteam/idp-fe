import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import Button from "src/components/Button";
import Field from "src/components/Field";
import styled from "styled-components";
import Swal from "sweetalert2";

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

const Row = styled.div<{ narrow?: boolean }>`
  display: flex;
  gap: ${({ narrow }) => (narrow ? "0.625rem" : "1.25rem")};
  align-items: center;
`;

const BackLink = styled(Link)`
  color: #959595;
  font-size: 0.875rem;
`;

const VerifiedText = styled.div`
  color: #26d681;
`;

const useRegister = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const loginPageUri = searchParams.get("redirect");

  const verifyTimer = useRef<NodeJS.Timer>();
  const [verifyLeftTime, setVerifyLeftTime] = useState(-1);
  const verifiedEmail = useRef<string>();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (verifyLeftTime < 0 && verifyTimer.current) {
      clearInterval(verifyTimer.current);
    }
    verifyTimer.current = undefined;
  }, [verifyLeftTime]);

  const handleRequest = async (email: string) => {
    if (!/^[^@]*@(gm\.)?gist\.ac\.kr$/.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("email.verify.wrongEmail"),
      });
      return;
    }
    if (verifyLeftTime >= 60 * 4) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("email.verify.tryLater"),
      });
      return;
    }
    setVerifyLeftTime(60 * 5);
    if (verifyTimer.current) clearInterval(verifyTimer.current);
    verifyTimer.current = setInterval(() => {
      setVerifyLeftTime((prev) => prev - 1);
    }, 1e3);
    verifiedEmail.current = email;
    setVerified(false);
  };

  const handleVerify = async (email: string, verificationCode: string) => {
    if (email !== verifiedEmail.current) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("email.verify.wrongEmail"),
      });
      return;
    }

    setVerified(true);
  };

  const getData = (event: React.FormEvent<HTMLFormElement>) => ({
    email: event.currentTarget.email.value,
    verificationCode: event.currentTarget.verificationCode.value,
    password: event.currentTarget.password.value,
    passwordConfirm: event.currentTarget.passwordConfirm.value,
    realName: event.currentTarget.realName.value,
    studentId: event.currentTarget.studentId.value,
    phoneNumber: event.currentTarget.phoneNumber.value,
  });

  const handleSubAction = (event: React.FormEvent<HTMLFormElement>) => {
    const action =
      document.activeElement?.getAttribute("name") === "action" &&
      (document.activeElement as HTMLButtonElement).value;

    const { email, verificationCode } = getData(event);
    if (action === "request") {
      handleRequest(email);
      return true;
    }
    if (action === "verify") {
      handleVerify(email, verificationCode);
      return true;
    }

    return false;
  };

  const checkPasswordHasError = (password: string, passwordConfirm: string) => {
    if (password === passwordConfirm) return false;
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: t("passwordConfirm.error"),
    });
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (handleSubAction(event)) return;
    event.currentTarget.reportValidity();
    const { password, passwordConfirm } = getData(event);
    if (checkPasswordHasError(password, passwordConfirm)) return;
  };

  return {
    handleSubmit,
    verifyLeftTime,
    verified,
    loginPageUri,
  };
};

const Register = () => {
  const { t } = useTranslation();
  const { handleSubmit, verifyLeftTime, verified, loginPageUri } =
    useRegister();
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
            <Row>
              <Button name="action" value="verify" formNoValidate outline small>
                {t("verificationCode.verify.action")}
              </Button>
              {!verified && (
                <VerifiedText>
                  ✅{t("verificationCode.verify.complete")}
                </VerifiedText>
              )}
            </Row>
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
        <Button>{t("register.action")}</Button>
      </Form>
      {loginPageUri && (
        <BackLink to={loginPageUri}>{t("register.back")}</BackLink>
      )}
    </Container>
  );
};

export default Register;
