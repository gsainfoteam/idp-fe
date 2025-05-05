import { cn } from '../utils/cn';

interface ThumbnailProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  img?: string;
  size?: number;
}

const colorMap = [
  {
    background: '#D1D1D1',
  },
  {
    background: '#FFCDD2',
  },
  {
    background: '#BAD9FF',
  },
  {
    background: '#C8E6C9',
  },
  {
    background: '#F8BBD0',
  },
  {
    background: '#D1C4E9',
  },
  {
    background: '#FFD1A5',
  },
];

export function Thumbnail({ name, img, size = 16, className }: ThumbnailProps) {
  if (img) {
    return (
      <div
        className={cn('rounded-full', className)}
        style={{
          width: size * 4,
          height: size * 4,
        }}
      >
        <img
          src={img}
          alt={img}
          className="h-full w-full rounded-full object-cover"
        />
      </div>
    );
  } else if (name) {
    const { background } = colorMap[name.charCodeAt(0) % colorMap.length]!;

    return (
      <div
        className={cn(
          'text-title-2 flex items-center justify-center rounded-full text-[30px] text-white',
          className,
        )}
        style={{
          width: size * 4,
          height: size * 4,
          background,
        }}
      >
        {name.charAt(0)}
      </div>
    );
  } else {
    return null;
  }
}
