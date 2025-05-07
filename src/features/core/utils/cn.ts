import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  override: {
    classGroups: {
      'font-size': [
        'text-title-1',
        'text-title-2',
        'text-title-3',
        'text-body-1',
        'text-body-2',
        'text-label-1',
        'text-label-2',
      ],
      'font-weight': [
        'text-title-1',
        'text-title-2',
        'text-title-3',
        'text-body-1',
        'text-body-2',
        'text-label-1',
        'text-label-2',
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
