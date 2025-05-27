import EditLineIcon from '@/assets/icons/solid/edit-line.svg?react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/features/core';
import { useFormContext } from 'react-hook-form';
import { ClientDetailsFormSchema } from '../hooks/use-client-details-form';

export function ClientNameForm() {
  const { register, watch, formState } =
    useFormContext<ClientDetailsFormSchema>();

  const [isFocused, setFocused] = useState(false);
  const [isError, setIsError] = useState(false);
  const [inputWidth, setInputWidth] = useState<number>(0);

  const spanRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const name = watch('name');
  const iconSize = 24;

  useEffect(() => {
    if (spanRef.current && containerRef.current) {
      const newWidth = spanRef.current.offsetWidth;
      const caretPadding = 2; // 커서 여유 공간
      const maxWidth = containerRef.current.offsetWidth - 13 - iconSize; // 13px = gap
      setInputWidth(Math.min(Math.max(newWidth + caretPadding, 0), maxWidth));
    }
  }, [name]);

  useEffect(() => {
    setIsError(!!formState.errors.name);
  }, [formState.errors.name]);

  return (
    <div ref={containerRef} className="flex w-full items-center gap-2">
      <label className="flex items-center gap-2">
        <input
          type="text"
          style={{ width: inputWidth }}
          className={cn(
            'border-b-2 bg-white transition-colors focus:outline-none',
            isError
              ? 'border-red-400'
              : isFocused
                ? 'border-neutral-400'
                : 'border-transparent',
          )}
          onFocus={() => setFocused(true)}
          {...register('name', {
            onBlur: () => setFocused(false),
          })}
        />
        <span ref={spanRef} className="invisible absolute">
          {name || '\t'}
        </span>
        <EditLineIcon
          className={cn(
            'transition-colors',
            isError
              ? 'text-red-400'
              : isFocused
                ? 'text-neutral-400'
                : 'text-neutral-200',
          )}
          width={iconSize}
          height={iconSize}
        />
      </label>
    </div>
  );
}
