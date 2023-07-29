import styled from "styled-components";

interface ButtonProps {
  small?: boolean;
  outline?: boolean;
}

const Button = styled.button<ButtonProps>`
  color: var(--color-${({ outline }) => (outline ? "primary" : "white")});
  background-color: var(
    --color-${({ outline }) => (outline ? "white" : "primary")}
  );
  padding: 0.625rem;
  border: none;
  border: ${({ outline }) => outline && "1px solid var(--color-primary)"};
  border-radius: 5px;
  min-height: ${({ small }) => (small ? "30px" : "50px")};
  min-width: 80px;

  font-size: ${({ small }) => (small ? "0.75rem" : "1.125rem")};
  font-weight: bold;

  cursor: pointer;
`;

export default Button;
