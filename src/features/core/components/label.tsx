import { PropsWithChildren } from 'react';

import { cn } from '../utils/cn';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
  required?: boolean;
}

export function Label({
  text,
  required,
  className,
  children,
  ...props
}: PropsWithChildren<LabelProps>) {
  return (
    <div>
      <label
        className={cn('text-label-1 mb-1 flex text-neutral-900', className)}
        {...props}
      >
        {text}
        {required && <div className="text-red-500">*</div>}
      </label>
      {children}
    </div>
  );
}
