import { useState } from 'react';

import { Input, InputProps } from './input';

import EyeCloseIcon from '@/assets/icons/line/eye-close.svg?react';
import EyeOpenIcon from '@/assets/icons/line/eye-open.svg?react';

export function PasswordInput({
  ...props
}: Omit<InputProps, 'type' | 'suffixIcon'>) {
  const [show, setShow] = useState(false);

  return (
    <Input
      type={show ? 'text' : 'password'}
      suffixAdornment={
        <div onClick={() => setShow((b) => !b)}>
          {show ? <EyeCloseIcon /> : <EyeOpenIcon />}
        </div>
      }
      {...props}
    />
  );
}
