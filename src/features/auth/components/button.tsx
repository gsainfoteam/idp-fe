import { Link, LinkComponentProps } from '@tanstack/react-router';
import { useState } from 'react';

import { LoadingEllipse } from './loading-ellipse';
import { Typo, TypographyVariants } from './typo';

import { cn } from '@/features/core';

type ButtonVariants = 'primary' | 'secondary' | 'text' | 'link';

type ButtonProps = {
  variant: ButtonVariants;
  typoVariant?: TypographyVariants;
  text: string;
  width?: `w-${string}`;
  isDisabled?: boolean;
  isLoading?: boolean;
};

function textStyle(
  variant: ButtonVariants,
  isDisabled: boolean,
  isPressed: boolean,
) {
  switch (variant) {
    case 'primary':
      return 'text-white';
    case 'secondary':
      return isDisabled ? 'text-neutral-600' : 'text-primary-600';
    case 'text':
      return isDisabled
        ? 'text-neutral-600'
        : isPressed
          ? 'text-primary-700'
          : 'text-primary-600';
    case 'link':
      return isPressed
        ? 'text-neutral-500 underline'
        : 'text-primary-400 underline';
  }
}

function borderStyle(variant: ButtonVariants, isDisabled: boolean) {
  switch (variant) {
    case 'primary':
      return '';
    case 'secondary':
      return isDisabled ? 'text-neutral-600' : 'text-primary-600';
    case 'text':
    case 'link':
      return '';
  }
}

function bgStyle(
  variant: ButtonVariants,
  isDisabled: boolean,
  isPressed: boolean,
) {
  switch (variant) {
    case 'primary':
      return isDisabled
        ? 'bg-neutral-600'
        : isPressed
          ? 'bg-primary-700'
          : 'bg-primary-600';
    case 'secondary':
      return isDisabled
        ? 'bg-neutral-100'
        : isPressed
          ? 'bg-primary-50'
          : 'bg-white';
    case 'text':
    case 'link':
      return '';
  }
}

function boxStyle(variant: ButtonVariants) {
  switch (variant) {
    case 'primary':
    case 'secondary':
      return 'flex items-center justify-center text-center rounded-lg w-full py-3';
    case 'text':
    case 'link':
      return '';
  }
}

export function Button({
  variant,
  typoVariant = 'title3',
  text,
  width = 'w-auto',
  isDisabled = false,
  isLoading: _isLoading = false,
  onClick,
  ...props
}: ButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> &
  LinkComponentProps) {
  const [isPressed, setIsPressed] = useState(false);
  const isLoading = variant === 'primary' && _isLoading;

  // const linkComponentProps: {
  //   [K: keyof LinkComponentProps]: (typeof props)[K]
  // } = props;

  // TODO: 마우스 뗐을 때 isPressed 초기화

  return (
    <button
      onClick={(e) => {
        setIsPressed(true);
        onClick?.(e);
      }}
      className={cn(
        borderStyle(variant, isDisabled),
        bgStyle(variant, isDisabled, isPressed),
        boxStyle(variant),
        width,
        'cursor-pointer',
        props.className,
      )}
      {...props}
    >
      {isLoading ? (
        <LoadingEllipse color="bg-[#d9d9d9]" />
      ) : (
        <Typo
          variant={typoVariant}
          className={cn(
            textStyle(variant, isDisabled, isPressed),
            props.className,
          )}
        >
          {variant === 'link' ? <Link {...props}>{text}</Link> : text}
        </Typo>
      )}
    </button>
  );
}
