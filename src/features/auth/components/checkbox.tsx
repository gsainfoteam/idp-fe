import { cva } from 'class-variance-authority';
import { useState } from 'react';

import CheckIcon from '../../../assets/check.svg?react';

import { cn } from '@/features/core';

type CheckboxProps = {
  checked?: boolean;
};

const checkboxStyles = cva(
  'w-5 h-5 bg-white rounded flex items-center justify-center transition-all',
  {
    variants: {
      checked: {
        true: 'bg-primary-500 border-none',
        false: 'border border-neutral-500',
      },
      disabled: {
        true: 'bg-neutral-300 cursor-default',
        false: 'cursor-pointer',
      },
    },
  },
);

export function Checkbox({
  checked = false,
  disabled = false,
  className,
  children,
  ...props
}: CheckboxProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const [isChecked, setChecked] = useState(checked);

  return (
    <div
      className={cn('flex items-center w-fit', className)}
      onClick={() => {
        if (!disabled) setChecked(!isChecked);
      }}
    >
      <input
        type="checkbox"
        checked={isChecked}
        className="hidden"
        {...props}
      />
      <div
        className={cn(checkboxStyles({ checked: isChecked, disabled }), 'm-1')}
      >
        {isChecked && <CheckIcon />}
      </div>
      <div
        className={cn(
          'ml-2 text-body-1 text-black',
          disabled ? 'cursor-default' : 'cursor-pointer',
        )}
      >
        {children}
      </div>
    </div>
  );
}
