import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Group = styled.div`
  margin: 0.75rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const Row = styled.div<{ narrow?: boolean }>`
  display: flex;
  gap: ${({ narrow }) => (narrow ? "0.625rem" : "1.25rem")};
  align-items: center;
`;

export const BackLink = styled(Link)`
  color: #959595;
  font-size: 0.875rem;
`;

export const VerifiedText = styled.div`
  color: #26d681;
`;
