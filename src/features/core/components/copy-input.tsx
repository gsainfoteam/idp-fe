import { useCopy } from '../hooks/use-copy';
import { Input, InputProps } from './input';

import ClipboardAddIcon from '@/assets/icons/line/clipboard-add.svg?react';
import ClipboardCheckIcon from '@/assets/icons/line/clipboard-check.svg?react';
import ClipboardXIcon from '@/assets/icons/line/clipboard-x.svg?react';
import { useState } from 'react';

type CopyInputProps = Omit<InputProps, 'suffixAdornment'> & {
  value: string;
  success?: string;
};

export function CopyInput({ value, success, ...props }: CopyInputProps) {
  const [copied, setCopied] = useState<true | false | null>(null);
  const copy = useCopy();

  return (
    <Input
      value={value}
      {...props}
      suffixAdornment={
        copied === null ? (
          <ClipboardAddIcon
            onClick={async () => setCopied(await copy(value, success))}
            onMouseLeave={() => setCopied(null)}
          />
        ) : copied ? (
          <ClipboardCheckIcon onMouseLeave={() => setCopied(null)} />
        ) : (
          <ClipboardXIcon onMouseLeave={() => setCopied(null)} />
        )
      }
    />
  );
}
