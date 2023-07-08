import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

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

export default useRegister;
