import { useCopy } from '../hooks/use-copy';
import { Input, InputProps } from './input';

import ClipboardAddIcon from '@/assets/icons/line/clipboard-add.svg?react';
import ClipboardCheckIcon from '@/assets/icons/line/clipboard-check.svg?react';
import ClipboardXIcon from '@/assets/icons/line/clipboard-x.svg?react';
import { useCallback, useState } from 'react';

type CopyInputProps = Omit<InputProps, 'suffixAdornment'> & {
  value: string;
  success?: string;
  showIcon?: boolean;
};

export function CopyInput({ value, success, showIcon = true, ...props }: CopyInputProps) {
  const [copied, setCopied] = useState<true | false | null>(null);
  const copy = useCopy();

  const handleCopy = useCallback(async () => {
    const result = await copy(value, success);
    setCopied(result);

    setTimeout(() => setCopied(null), 2000);
  }, [copy, value, success]);

  return (
    <Input
      value={value}
      {...props}
      suffixAdornment={
        showIcon ?
          copied === null ? (
            <ClipboardAddIcon
              onClick={handleCopy}
              onMouseLeave={() => setCopied(null)}
            />
          ) : copied ? (
            <ClipboardCheckIcon onMouseLeave={() => setCopied(null)} />
          ) : (
            <ClipboardXIcon onMouseLeave={() => setCopied(null)} />
          ) 
        : null
      }
    />
  );
}
