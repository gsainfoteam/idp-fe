import { cn } from '../../utils/cn';

export interface StepProgressProps {
  totalSteps: number;
  currentStep: number;
  className?: string;
}

export function StepProgress({
  totalSteps,
  currentStep,
  className,
}: StepProgressProps) {
  return (
    <div
      className={cn('flex items-center justify-center gap-1.5', className)}
      role="progressbar"
      aria-valuenow={currentStep + 1}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-label={`Step ${currentStep + 1} of ${totalSteps}`}
    >
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={cn(
            'h-1.5 rounded-full transition-all',
            index === currentStep
              ? 'bg-primary-600 w-3'
              : 'w-1.5 bg-neutral-200 dark:bg-neutral-800',
          )}
        />
      ))}
    </div>
  );
}
