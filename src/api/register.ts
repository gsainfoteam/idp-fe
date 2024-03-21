import api from ".";

export const requestEmailVerification = async (email: string) =>
  api.post("/user/register/code", { email });

export const verifyEmail = async (email: string, code: string) =>
  api
    .post("/user/register/validate", { email, code })
    .then((res) => res.data.certificationJwtToken);

interface RegisterForm {
  email: string;
  password: string;
  name: string;
  studentId: string;
  phoneNumber: string;
  certificationJwtToken: string;
}

export const register = async ({
  email,
  password,
  name,
  studentId,
  phoneNumber,
  certificationJwtToken,
}: RegisterForm) =>
  api.post("/user/register", {
    email,
    password,
    name,
    phoneNumber,
    studentId,
    certificationJwtToken,
  });
