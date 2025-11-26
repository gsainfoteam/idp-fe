import { type PropsWithChildren } from 'react';

import { cn } from '../../utils/cn';

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
      <label {...props}>
        <div
          className={cn('text-label-1 text-label-text mb-1.5 flex', className)}
        >
          {text}
          {required && <div className="text-label-required">*</div>}
        </div>
        {children}
      </label>
    </div>
  );
}
