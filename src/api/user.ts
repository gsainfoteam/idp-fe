import api from ".";

interface ChangePasswordForm {
  verificationToken: string;
  email: string;
  password: string;
}

export const changePassowrd = ({
  verificationToken,
  email,
  password,
}: ChangePasswordForm) =>
  api.post("/v1/user/change_password", {
    certification_jwt_token: verificationToken,
    user_email_id: email,
    changed_password: password,
  });
