import { cn } from '../utils/cn';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  seed?: number;
  img?: string;
  size?: number;
}

const colorMap = [
  {
    background: '#BDBDBD',
  },
  {
    background: '#EF9A9A',
  },
  {
    background: '#90CAF9',
  },
  {
    background: '#A5D6A7',
  },
  {
    background: '#F48FB1',
  },
  {
    background: '#B39DDB',
  },
  {
    background: '#FFCC80',
  },
];

export function Avatar({
  name,
  img,
  size = 16,
  seed = 0,
  className,
}: AvatarProps) {
  if (img) {
    return (
      <div className="h-fit w-fit">
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
          'flex items-center justify-center rounded-full font-extrabold text-white',
          className,
        )}
        style={{
          width: size * 4,
          height: size * 4,
          fontSize: size * 2,
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
