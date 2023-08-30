import api from ".";

interface ChangePasswordForm {
  verificationToken: string;
  email: string;
  password: string;
}

export const getUserInfo = () =>
  api.get("/idp/user").then(({ data }) => ({
    uuid: data.user_uuid as string,
    email: data.user_email_id as string,
    name: data.user_name as string,
    phoneNumber: data.user_phone_number as string,
    studentId: data.student_id as string,
  }));

export const changePassowrd = ({
  verificationToken,
  email,
  password,
}: ChangePasswordForm) =>
  api.patch("/v1/user/password", {
    certification_jwt_token: verificationToken,
    user_email_id: email,
    changed_password: password,
  });

export const withdraw = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) =>
  api.delete("/v1/user", {
    data: { user_email_id: email, password },
  });
