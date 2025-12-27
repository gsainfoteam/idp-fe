import { useState } from 'react';

import { Input, type InputProps } from '../atomic/input';

import EyeCloseIcon from '@/assets/icons/line/eye-close.svg?react';
import EyeOpenIcon from '@/assets/icons/line/eye-open.svg?react';

type PasswordInputProps = Omit<InputProps, 'type' | 'suffixAdornment'>;

export function PasswordInput({ ...props }: PasswordInputProps) {
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
