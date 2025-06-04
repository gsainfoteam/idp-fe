import { cn } from '../utils/cn';
import { Button, ButtonProps } from './button';

export type IconButtonProps = Omit<ButtonProps, 'prefixIcon' | 'suffixIcon'> & {
  icon: React.ReactNode;
};

export function IconButton({
  className,
  size = 'large',
  icon,
  variant,
  ...props
}: IconButtonProps) {
  const sizeStyles: Record<NonNullable<IconButtonProps['size']>, string> = {
    large: 'p-3',
    medium: 'p-2',
    small: 'p-1',
    none: 'p-0',
  };

  return (
    <Button
      variant={variant}
      className={cn('aspect-square', sizeStyles[size], className)}
      prefixIcon={icon}
      {...props}
    />
  );
}
