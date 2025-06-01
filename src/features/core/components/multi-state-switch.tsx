import { useEffect, useState } from 'react';

import { cn, palette } from '@/features/core';

export interface MultiStateSwitchProps
  extends React.HTMLAttributes<HTMLDivElement> {
  labels: string[];
  selected?: number;
  disabled?: boolean;
  onChangeIndex?: (index: number, label: string) => void;
}

const mssColors = palette((selected: boolean) => ({
  default: {
    background: selected
      ? 'bg-mss-selected-default-background'
      : 'bg-mss-default-default-background',
    border: 'inset-ring-mss-default-default-background inset-ring-2',
    label: selected
      ? 'text-mss-selected-default-label'
      : 'text-mss-default-default-label',
  },
  disabled: {
    background: selected
      ? 'disabled:bg-mss-selected-disabled-background'
      : 'disabled:bg-mss-default-disabled-background',
    border: 'disabled:inset-ring-mss-default-disabled-background',
    label: selected
      ? 'disabled:text-mss-selected-disabled-label'
      : 'disabled:text-mss-default-disabled-label',
  },
}));

export function MultiStateSwitch({
  labels,
  selected: initialSelected = 0,
  disabled = false,
  onChangeIndex,
  className,
  ...props
}: MultiStateSwitchProps) {
  const [selected, setSelected] = useState(initialSelected);

  useEffect(() => {
    if (selected < 0) setSelected(0);
    if (selected >= labels.length) setSelected(labels.length - 1);
  }, [selected, setSelected, labels]);

  return (
    <div
      className={cn(
        'flex h-fit w-full rounded-lg',
        disabled
          ? 'bg-mss-default-disabled-background'
          : 'bg-mss-default-default-background',
        className,
      )}
      {...props}
    >
      {labels.map((label, idx) => (
        <button
          key={idx}
          disabled={disabled}
          className={cn(
            'flex w-full items-center justify-center rounded-lg py-3 text-center',
            idx === selected ? 'text-title-3' : 'text-body-1',
            disabled ? 'cursor-default' : 'cursor-pointer',
            mssColors(idx === selected),
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
