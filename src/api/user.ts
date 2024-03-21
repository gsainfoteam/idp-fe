import api from ".";

interface ChangePasswordForm {
  verificationToken: string;
  email: string;
  password: string;
}

export const getUserInfo = () =>
  api.get("/idp/user").then(({ data }) => ({
    uuid: data.uuid as string,
    email: data.email as string,
    name: data.name as string,
    phoneNumber: data.phoneNumber as string,
    studentId: data.studentId as string,
  }));

export const changePassword = ({
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
