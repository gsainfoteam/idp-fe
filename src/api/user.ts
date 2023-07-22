import api from ".";

interface ChangePasswordForm {
  verificationToken: string;
  email: string;
  password: string;
}

export const getUserInfo = () =>
  api.get("/idp/user").then(({ data }) => ({
    uuid: data.user_uuid,
    email: data.user_email_id,
    name: data.user_name,
    phoneNumber: data.user_phone_number,
    studentId: data.student_id,
  }));

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
