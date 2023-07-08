import { InputHTMLAttributes } from "react";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const Field = ({
  children,
  label,
}: // ...props
React.PropsWithChildren<FieldProps>) => (
  <div>
    {label}
    {children}
  </div>
);

export default Field;
