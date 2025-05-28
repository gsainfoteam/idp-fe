import { useEffect, useState } from 'react';

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

  useEffect(() => {
    if (selected < 0) setSelected(0);
    if (selected >= labels.length) setSelected(labels.length - 1);
  }, [selected, setSelected, labels]);

  return (
    <div
      className="bg-multi-state-switch-background flex h-fit w-full rounded-lg"
      {...props}
    >
      {labels.map((label, idx) => (
        <button
          key={idx}
          className={cn(
            'flex w-full cursor-pointer items-center justify-center rounded-lg py-3 text-center',
            idx === selected
              ? 'text-title-3 bg-multi-state-switch-selected-background text-multi-state-switch-selected-label shadow-[inset_0_0_0_2px_theme(colors.neutral.100)]'
              : 'text-body-1 text-multi-state-switch-unselected-label bg-transparent',
          )}
          onClick={() => {
            setSelected(idx);
            onChangeIndex?.(idx, label);
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
