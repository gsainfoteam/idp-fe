import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "src/api/auth";
import Swal from "sweetalert2";

const useLogin = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";
  const { login } = useAuth({ redirectIfFound: true, redirectUrl });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget.email as HTMLInputElement;
    const password = event.currentTarget.password as HTMLInputElement;

    try {
      setLoading(true);
      await login({ email: email.value, password: password.value });
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

  return { handleSubmit, loading };
};

export default useLogin;
