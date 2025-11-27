import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { type Client } from '../hooks/use-client';
import { type ClientDetailsFormSchema } from '../hooks/use-client-details-form';
import { useClientNameForm } from '../hooks/use-client-name-form';

import AlertOctagonIcon from '@/assets/icons/solid/alert-octagon.svg?react';
import EditLineIcon from '@/assets/icons/solid/edit-line.svg?react';
import { cn } from '@/features/core';

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
  const disabled = client.deleteRequestedAt != null;

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
        <div className="flex items-center gap-2">
          {disabled && <AlertOctagonIcon className="text-red-700" />}
          <input
            type="text"
            style={{ width: inputWidth }}
            disabled={disabled}
            className={cn(
              'border-b-2 border-transparent transition-colors focus:border-neutral-400 focus:outline-none',
              isError && 'border-red-400 focus:border-red-400',
              disabled && 'border-none text-red-700',
            )}
            {...register('name', {
              onBlur: () => {
                if (formState.errors.name == null)
                  setValue('name', name, { shouldDirty: true });
              },
            })}
          />
        </div>
        <span ref={spanRef} className="invisible absolute">
          {name || '\t'}
        </span>
        {!disabled && (
          <EditLineIcon
            className={cn(
              'text-neutral-200 transition-colors group-focus-within:text-neutral-400',
              isError && 'text-red-400 group-focus-within:text-red-400',
            )}
            width={iconSize}
            height={iconSize}
          />
        )}
      </label>
    </div>
  );
}
