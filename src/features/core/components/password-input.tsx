import { useState } from 'react';

import { Input, InputProps } from './input';

import EyeCloseIcon from '@/assets/icons/eye-close.svg?react';
import EyeOpenIcon from '@/assets/icons/eye-open.svg?react';

export function PasswordInput({
  ...props
}: Omit<InputProps, 'type' | 'suffixIcon'>) {
  const [show, setShow] = useState(false);

  return (
    <Input
      type={show ? 'text' : 'password'}
      suffixIcon={
        <div onClick={() => setShow((b) => !b)}>
          {show ? (
            <EyeCloseIcon style={{ color: 'var(--color-neutral-800)' }} />
          ) : (
            <EyeOpenIcon style={{ color: 'var(--color-neutral-800)' }} />
          )}
        </div>
      }
      {...props}
    />
  );
}
