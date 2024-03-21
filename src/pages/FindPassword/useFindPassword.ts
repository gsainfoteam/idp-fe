import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { requestEmailVerification, verifyEmail } from "src/api/register";
import { changePassword } from "src/api/user";
import Swal from "sweetalert2";

const useFindPassword = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const loginPageUri = searchParams.get("redirect");
  const navigate = useNavigate();

  const verifyTimer = useRef<NodeJS.Timer>();
  const [verifyLeftTime, setVerifyLeftTime] = useState(-1);
  const verifiedEmail = useRef<string>();
  const [verified, setVerified] = useState(false);
  const verificationToken = useRef<string>();
  const [loading, setLoading] = useState(false);

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

    try {
      setLoading(true);
      await requestEmailVerification(email);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: t("email.verify.success"),
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("email.verify.error"),
      });
      setVerifyLeftTime(-1);
    } finally {
      setLoading(false);
    }
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
    if (verifyLeftTime < 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("email.verify.timeout"),
      });
      return;
    }

    try {
      verificationToken.current = await verifyEmail(email, verificationCode);
      setVerified(true);
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("verificationCode.verify.error"),
      });
    } finally {
      setLoading(false);
    }
  };

  const getData = (event: React.FormEvent<HTMLFormElement>) => ({
    email: event.currentTarget.email.value,
    verificationCode: event.currentTarget.verificationCode.value,
    password: event.currentTarget.password.value,
    passwordConfirm: event.currentTarget.passwordConfirm.value,
  });

  const handleSubAction = (event: React.FormEvent<HTMLFormElement>) => {
    const button = (event.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement;
    const action = button.getAttribute("name") === "action" && button.value;
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
    if (!verified || !verificationToken.current) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("email.verify.notVerified"),
      });
      return;
    }
    const { password, passwordConfirm, email } = getData(event);
    if (email !== verifiedEmail.current) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("email.verify.wrongEmail"),
      });
      return;
    }
    if (checkPasswordHasError(password, passwordConfirm)) return;
    try {
      await changePassword({
        email,
        password,
        verificationToken: verificationToken.current,
      });
      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: t("findPassword.change.success"),
        confirmButtonText: t("register.back"),
      });
      navigate(loginPageUri || "/");
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("findPassword.change.error"),
      });
      return;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmit,
    verifyLeftTime,
    verified,
    loginPageUri,
    loading,
  };
};

export default useFindPassword;
