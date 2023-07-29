import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "src/api/auth";
import Swal from "sweetalert2";

import { recentlyLoginKey } from "../Authorize/useAuthorize";

const useLogin = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget.email as HTMLInputElement;
    const password = event.currentTarget.password as HTMLInputElement;

    try {
      setLoading(true);
      await login({ email: email.value, password: password.value });
      sessionStorage.setItem(recentlyLoginKey, "true");
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
