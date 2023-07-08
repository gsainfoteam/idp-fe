import { useTranslation } from "react-i18next";
import Field from "src/components/Field";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  padding: 0 1.25rem;
  text-align: center;
`;

const Form = styled.form``;

const useRegister = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return { handleSubmit };
};

const Register = () => {
  const { t } = useTranslation();
  const { handleSubmit } = useRegister();

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Field
          label={t("email.label")}
          type="email"
          autoComplete="email"
          required
        />
      </Form>
    </Container>
  );
};

export default Register;
