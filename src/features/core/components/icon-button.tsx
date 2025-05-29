import { cn } from '../utils/cn';
import { Button, ButtonProps } from './button';

export type IconButtonProps = Omit<ButtonProps, 'prefixIcon' | 'suffixIcon'> & {
  icon: React.ReactNode;
};

export function IconButton({
  className,
  icon,
  variant,
  ...props
}: IconButtonProps) {
  return (
    <Button
      variant={variant}
      className={cn(variant !== 'link' && 'px-3', className)}
      prefixIcon={icon}
      {...props}
    />
  );
}
