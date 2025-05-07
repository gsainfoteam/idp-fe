import { useState } from 'react';

import { cn } from '../utils/cn';

interface MultiStateSwitchProps extends React.HTMLAttributes<HTMLDivElement> {
  labels: string[];
  selected?: number;
  onChangeIndex?: (index: number, label: string) => void;
}

export function MultiStateSwitch({
  labels,
  selected: initialSelected = 0,
  onChangeIndex,
  ...props
}: MultiStateSwitchProps) {
  const [selected, setSelected] = useState(initialSelected);

  if (selected < 0) setSelected(0);
  if (selected >= labels.length) setSelected(labels.length - 1);

  return (
    <div className="flex h-fit w-full rounded-lg bg-neutral-100" {...props}>
      {labels.map((label, idx) => (
        <div
          key={idx}
          className={cn(
            'flex w-full items-center justify-center rounded-lg py-3 text-center',
            idx === selected
              ? 'text-title-3 bg-white text-black shadow-[inset_0_0_0_2px_theme(colors.neutral.100)]'
              : 'text-body-1 bg-transparent text-neutral-500',
          )}
          onClick={() => {
            setSelected(idx);
            onChangeIndex?.(idx, label);
          }}
        >
          {label}
        </div>
      ))}
    </div>
  );
}
