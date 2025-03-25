import { MouseEventHandler } from 'react';

import { LoadingEllipse } from './loading-ellipse';

import { cn } from '@/features/core';

export type ButtonProps = {
  text: string;
  height: number;
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};

export function BoxButton({
  text,
  height,
  isLoading = false,
  isDisabled = false,
  onClick = undefined,
}: ButtonProps) {
  if (isLoading) isDisabled = false;
  if (isDisabled) isLoading = false;

  return (
    <button
      className={cn(
        `flex items-center justify-center text-center rounded-[8px] w-full h-[${height}px]`,
        isDisabled
          ? 'bg-[#5d5d5d]'
          : isLoading
            ? 'bg-[#cc2f02]'
            : 'bg-[#ff4500]',
      )}
      onClick={onClick}
    >
      <p
        className={cn(
          isLoading ? 'text-[#d9d9d9]' : 'text-[#ffffff]',
          `font-semibold text-[16px] leading-[150%] tracking-[0%]`,
        )}
      >
        {isLoading ? <LoadingEllipse /> : text}
      </p>
    </button>
  );
}
