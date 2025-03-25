import { FieldPath, FieldValues, UseFormRegister } from 'react-hook-form';

import { cn } from '@/features/core';

type InputProps<T extends FieldValues> = {
  isError?: boolean;
  isDisabled?: boolean;
  type: FieldPath<T>;
  placeholder: string;
  register: UseFormRegister<T>;
};

export function Input<T extends FieldValues>({
  isError = false,
  isDisabled = false,
  type,
  placeholder,
  register,
}: InputProps<T>) {
  return (
    <input
      {...register(type)}
      className={cn(
        isError ? `border-[2px]` : `border-[1px]`,
        isError ? 'border-[#ff2534]' : 'border-[#888888]',
        isDisabled ? 'bg-[#f2f2f2]' : 'bg-[#ffffff]',
        `w-full h-[48px] rounded-[4px] pt-3 pb-3 pl-4 pr-4`,
      )}
      type={type}
      placeholder={placeholder}
    />
  );
}
