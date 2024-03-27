import api from ".";

interface ChangePasswordForm {
  certificationJwtToken: string;
  email: string;
  password: string;
}

export const getUserInfo = () =>
  api.get("/idp/user").then(
    ({ data }) =>
      data as {
        uuid: string;
        email: string;
        name: string;
        studentId: string;
        phoneNumber: string;
        createdAt: string;
        updatedAt: string;
        accessLevel: string;
      },
  );

export const changePassword = (props: ChangePasswordForm) =>
  api.patch("/user/password", props);

export const withdraw = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) =>
  api.delete("/user", {
    data: { email, password },
  });
