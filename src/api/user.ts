import api from ".";

interface ChangePasswordForm {
  certificationJwtToken: string;
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
  certificationJwtToken,
  email,
  password,
}: ChangePasswordForm) =>
  api.patch("/user/password", { certificationJwtToken, email, password });

export const withdraw = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => api.delete("/user", { data: { email, password } });
