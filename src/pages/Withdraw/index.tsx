import { useTranslation } from "react-i18next";
import { useAuth } from "src/api/auth";
import { withdraw } from "src/api/user";
import Button from "src/components/Button";
import Input from "src/components/Input";
import Swal from "sweetalert2";

const WithdrawPage = () => {
  const { t } = useTranslation();
  const { logout } = useAuth();

  const handleWithdraw = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    const waitResult = await Swal.fire({
      title: t("profile.withdraw.progress"),
      showCancelButton: true,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    if (waitResult.dismiss !== Swal.DismissReason.timer) return;

    const withdrawResult = await Swal.fire({
      title: t("profile.withdraw.progress"),
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: async () => {
        Swal.showLoading();
        try {
          await withdraw({ email, password });
          Swal.close({ isConfirmed: true });
        } catch {
          Swal.close({ isConfirmed: false });
        }
      },
    });
    if (!withdrawResult.isConfirmed) {
      return Swal.fire({
        title: t("profile.withdraw.fail"),
        icon: "error",
      });
    }
    await Swal.fire({
      title: t("profile.withdraw.success"),
      icon: "success",
    });
    logout();
  };

  return (
    <div>
      <h1>{t("profile.withdraw.action")}</h1>
      <p>{t("profile.withdraw.confirm")}</p>
      <form onSubmit={handleWithdraw}>
        <Input
          placeholder={t("email.placeholder")}
          autoComplete="off"
          required
          name="email"
        />
        <br />
        <br />
        <Input
          placeholder={t("password.placeholder")}
          type="password"
          autoComplete="off"
          required
          name="password"
        />
        <br />
        <br />
        <Button>{t("profile.withdraw.action")}</Button>
      </form>
    </div>
  );
};

export default WithdrawPage;
