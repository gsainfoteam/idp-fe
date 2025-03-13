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
  width: 100%;
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
  margin-top: 1rem;
`;

export const VerifiedText = styled.div`
  color: #26d681;
  position: relative;
  padding-left: 1.5em;

  ::before,
  ::after {
    content: "";
    top: 0.9375em;
    left: 0.5em;
    transform-origin: left;
    position: absolute;
    border-bottom: 2px solid currentColor;
  }

  ::before {
    width: 0.5em;
    transform: rotate(-135deg);
  }

  ::after {
    width: 1em;
    transform: rotate(-45deg);
  }
`;
