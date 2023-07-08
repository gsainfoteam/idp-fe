import api from ".";

export const requestEmailVerification = async (email: string) =>
  api.post("/v1/user/register/code", { user_email_id: email });

export const verifyEmail = async (email: string, code: string) =>
  api
    .post("/v1/user/register/validate", {
      user_email_id: email,
      email_certification_code: code,
    })
    .then((res) => res.data.register_certification_jwt_token);

interface RegisterForm {
  email: string;
  password: string;
  name: string;
  studentId: string;
  phoneNumber: string;
  verificationToken: string;
}

export const register = async ({
  email,
  password,
  name,
  studentId,
  phoneNumber,
  verificationToken,
}: RegisterForm) =>
  api.post("/v1/user/register", {
    user_email_id: email,
    user_password: password,
    user_name: name,
    user_phone_number: phoneNumber,
    student_id: studentId,
    register_certification_jwt_token: verificationToken,
  });
