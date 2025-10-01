import { cn } from '../utils/cn';

interface CardProps {
  avatar: React.ReactNode;
  title: React.ReactNode;
  description?: string;
  action?: React.ReactNode;
  cardClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function Card({
  avatar,
  title,
  description,
  action,
  cardClassName,
  titleClassName,
  descriptionClassName,
}: CardProps) {
  return (
    <div
      className={cn(
        'border-basics-tertiary-label flex items-center gap-3 rounded-lg border p-3',
        cardClassName,
      )}
    >
      <div>{avatar}</div>
      <div className="min-w-0 flex-1">
        <div
          className={cn(
            'text-title-3 text-basics-primary-label truncate',
            titleClassName,
          )}
        >
          <div className="flex items-center gap-1">{title}</div>
        </div>
        {description && (
          <div
            className={cn(
              'text-label-2 text-basics-secondary-label truncate',
              descriptionClassName,
            )}
          >
            {description}
          </div>
        )}
      </div>
      {action}
    </div>
  );
}
