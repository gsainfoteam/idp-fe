import { InputHTMLAttributes } from "react";
import styled from "styled-components";

import Input from "./Input";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

const LabelText = styled.div`
  text-align: left;
  font-size: 0.875rem;
`;

const UnderlinedInput = styled(Input)`
  border: none;
  border-bottom: 1px solid #e4e4e4;
  border-radius: 0;
`;

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const Field = ({
  children,
  label,
  ...props
}: React.PropsWithChildren<FieldProps>) => (
  <Container>
    <Label>
      <LabelText>{label}</LabelText>
      <UnderlinedInput {...props} />
    </Label>
    {children}
  </Container>
);

export default Field;
