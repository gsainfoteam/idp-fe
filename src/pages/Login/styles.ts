import { Link } from "react-router-dom";
import Button from "src/components/Button";
import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  padding: 0 1.25rem;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  margin: 2rem 0 1.25rem;
`;

export const LoginButton = styled(Button)`
  margin-top: 0.625rem;
`;

export const Links = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 0.375rem;

  &,
  * {
    color: #959595;
    text-decoration: none;
    font-size: 0.875rem;
  }
`;

export const FindPassword = styled(Link)``;

export const Register = styled(Link)`
  color: var(--color-primary);
`;
