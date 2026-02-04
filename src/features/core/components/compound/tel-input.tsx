import { useMemo } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import type {
  Country,
  DefaultInputComponentProps,
} from 'react-phone-number-input';
import enLabels from 'react-phone-number-input/locale/en';
import koLabels from 'react-phone-number-input/locale/ko';
import PhoneInputWithCountrySelect from 'react-phone-number-input/react-hook-form';

import { cn } from '@/features/core';
import i18n from '@/locales/i18n';

export interface TelInputProps<T extends FieldValues>
  extends Omit<
    React.ComponentProps<
      typeof PhoneInputWithCountrySelect<DefaultInputComponentProps, T>
    >,
    'control' | 'name'
  > {
  name: Path<T>;
  control: Control<T>;
  defaultCountry?: Country;
  onCountryChange?: (country?: Country) => void;
  error?: string | boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export function TelInput<T extends FieldValues>({
  name,
  control,
  defaultCountry = 'KR',
  onCountryChange,
  error,
  disabled,
  placeholder,
  className,
  numberInputProps,
  ...rest
}: TelInputProps<T>) {
  const hasError =
    typeof error === 'string' ? error.trim().length > 0 : !!error;

  const labels = useMemo(() => {
    return i18n.language === 'ko' ? koLabels : enLabels;
  }, []);

  return (
    <div className={className}>
      <PhoneInputWithCountrySelect
        name={name}
        control={control}
        defaultCountry={defaultCountry}
        onCountryChange={onCountryChange}
        disabled={disabled}
        placeholder={placeholder}
        labels={labels}
        className={cn(
          'PhoneInput--wrapper flex w-full items-center gap-2 overflow-hidden rounded-lg pl-4',
          'bg-input-default-background',
          'inset-ring-input-default-border inset-ring',
          'transition duration-200',
          !hasError &&
            'focus-within:bg-input-focus-background focus-within:inset-ring-input-focus-border focus-within:inset-ring',
          hasError &&
            'bg-input-error-background inset-ring-input-error-border inset-ring-2',
          disabled &&
            'bg-input-disabled-background inset-ring-input-disabled-border',
        )}
        numberInputProps={{
          className: cn(
            'PhoneInputInput text-body-1 w-full rounded-lg border-0 bg-transparent py-3 pr-4 pl-1',
            'text-input-default-label placeholder:text-input-placeholder',
            'shadow-none outline-none focus:ring-0',
            !hasError && 'focus:text-input-focus-label focus:bg-transparent',
            hasError &&
              'text-input-error-label placeholder:text-input-placeholder',
            disabled &&
              'text-input-disabled-label placeholder:text-input-disabled-label cursor-not-allowed bg-transparent',
          ),
          ...numberInputProps,
        }}
        {...rest}
      />
      {typeof error === 'string' && error.trim().length > 0 && (
        <div className="text-label-1 text-input-error-border mt-1 px-1">
          {error}
        </div>
      )}
    </div>
  );
}

TelInput.displayName = 'TelInput';
