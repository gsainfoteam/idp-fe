import { useState } from 'react';

interface MultiStateSwitchProps {
  labels: string[];
  selected?: number;
}

export function MultiStateSwitch({
  labels,
  selected: initialSelected = 0,
}: MultiStateSwitchProps) {
  const [selected, setSelected] = useState(initialSelected);

  if (selected < 0 || selected >= labels.length) {
    throw new Error(
      `Selected index (${selected}) is out of bounds (0-${labels.length - 1})`,
    );
  }

  return (
    <div className="flex h-fit w-full rounded-lg bg-neutral-100">
      {labels.map((label, idx) => {
        return idx === selected ? (
          <div
            key={idx}
            className="text-title-3 flex w-full items-center justify-center rounded-lg bg-white py-3 text-center text-black shadow-[inset_0_0_0_2px_theme(colors.neutral.100)]"
            onClick={() => setSelected(idx)}
          >
            {label}
          </div>
        ) : (
          <div
            key={idx}
            className="text-body-1 flex w-full items-center justify-center rounded-lg bg-transparent py-3 text-center text-neutral-500"
            onClick={() => setSelected(idx)}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
}
