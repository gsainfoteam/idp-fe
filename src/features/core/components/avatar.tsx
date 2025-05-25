import { cn } from '../utils/cn';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  seed?: number;
  img?: string;
  size?: number;
}

const colorMap = [
  {
    background: 'var(--color-avatar-gray)',
  },
  {
    background: 'var(--color-avatar-red)',
  },
  {
    background: 'var(--color-avatar-blue)',
  },
  {
    background: 'var(--color-avatar-green)',
  },
  {
    background: 'var(--color-avatar-purple)',
  },
  {
    background: 'var(--color-avatar-orange)',
  },
];

export function Avatar({
  name,
  img,
  size = 16,
  seed = 0,
  className,
  ...props
}: AvatarProps) {
  if (img) {
    return (
      <div className="h-fit w-fit" {...props}>
        <img
          src={img}
          alt={img}
          style={{
            width: size * 4,
            height: size * 4,
          }}
          className={cn('rounded-full', className)}
        />
      </div>
    );
  } else if (name) {
    const { background } = colorMap[seed % colorMap.length]!;

    return (
      <div
        className={cn(
          'text-avatar-label flex items-center justify-center rounded-full font-extrabold',
          className,
        )}
        style={{
          width: size * 4,
          height: size * 4,
          fontSize: size * 2,
          background,
        }}
        {...props}
      >
        {name.charAt(0)}
      </div>
    );
  } else {
    return null;
  }
}
