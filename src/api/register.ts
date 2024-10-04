import api from ".";

export enum EmailVerificationType {
  Register = "register",
  FindPassword = "password",
}

export const requestEmailVerification = async (
  email: string,
  type: EmailVerificationType,
) => api.post("/user/register/code", { email, type });

export const verifyEmail = async (email: string, code: string) =>
  api
    .post("/user/register/validate", {
      email,
      code,
    })
    .then((res) => res.data.certificationJwtToken);

interface RegisterForm {
  email: string;
  password: string;
  name: string;
  studentId: string;
  phoneNumber: string;
  certificationJwtToken: string;
}

export const register = async (props: RegisterForm) =>
  api.post("/user/register", props);
