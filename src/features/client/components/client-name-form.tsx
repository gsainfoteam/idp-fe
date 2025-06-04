import EditLineIcon from '@/assets/icons/solid/edit-line.svg?react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/features/core';
import { Client } from '../hooks/use-client';
import { useClientNameForm } from '../hooks/use-client-name-form';
import { useFormContext } from 'react-hook-form';
import { ClientDetailsFormSchema } from '../hooks/use-client-details-form';

export function ClientNameForm({ client }: { client: Client }) {
  const {
    form: { register, watch, formState },
  } = useClientNameForm({ client });
  const { setValue } = useFormContext<ClientDetailsFormSchema>();

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
      <label className="group flex items-center gap-2">
        <input
          type="text"
          style={{ width: inputWidth }}
          className={cn(
            'bg-funnel-background focus:border-basics-secondary-label border-b-2 border-transparent transition-colors focus:outline-none',
            isError &&
              'border-basics-error-label focus:border-basics-error-label',
          )}
          {...register('name', {
            onBlur: () => {
              if (formState.errors.name == null)
                setValue('name', name, { shouldDirty: true });
            },
          })}
        />
        <span ref={spanRef} className="invisible absolute">
          {name || '\t'}
        </span>
        <EditLineIcon
          className={cn(
            'text-basics-tertiary-label group-focus-within:text-basics-secondary-label transition-colors',
            isError &&
              'text-basics-error-label group-focus-within:text-basics-error-label',
          )}
          width={iconSize}
          height={iconSize}
        />
      </label>
    </div>
  );
}
