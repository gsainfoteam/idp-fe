import { motion } from 'framer-motion';
import { useEffect, useState, useRef, useLayoutEffect } from 'react';

import { cn, palette } from '@/features/core';

const handleColor = palette((disabled: boolean) => ({
  default: {
    background: 'bg-mss-selected-default-background',
    border: 'inset-ring-mss-default-default-background inset-ring-2',
    label: 'text-mss-selected-default-label',
  },
  disabled: {
    background: disabled && 'bg-mss-selected-disabled-background',
    border: disabled && 'inset-ring-mss-default-disabled-background',
    label: disabled && 'text-mss-selected-disabled-label',
  },
}));

export interface MultiStateSwitchProps
  extends React.HTMLAttributes<HTMLDivElement> {
  labels: string[];
  selected?: number;
  disabled?: boolean;
  onChangeIndex?: (index: number, label: string) => void;
}

export function MultiStateSwitch({
  labels,
  selected: initialSelected = 0,
  disabled = false,
  onChangeIndex,
  className,
  ...props
}: MultiStateSwitchProps) {
  const [selected, setSelected] = useState(initialSelected);

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const container = containerRef.current;
    const selectedBtn = buttonRefs.current[selected];

    if (container && selectedBtn) {
      const rect = selectedBtn.getBoundingClientRect();
      const parentRect = container.getBoundingClientRect();
      setIndicatorStyle({
        left: rect.left - parentRect.left,
        width: rect.width,
      });
    }
  }, [selected, labels]);

  useEffect(() => {
    if (selected < 0) setSelected(0);
    if (selected >= labels.length) setSelected(labels.length - 1);
  }, [selected, setSelected, labels]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative flex h-fit w-full rounded-lg',
        disabled
          ? 'bg-mss-default-disabled-background'
          : 'bg-mss-default-default-background',
        className,
      )}
      {...props}
    >
      <motion.div
        className={cn(
          'absolute top-0 bottom-0 rounded-lg',
          handleColor(disabled),
        )}
        animate={indicatorStyle}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
      {labels.map((label, idx) => (
        <button
          key={idx}
          disabled={disabled}
          ref={(el) => {
            buttonRefs.current[idx] = el;
          }}
          className={cn(
            'relative z-10 flex w-full items-center justify-center rounded-lg py-3 text-center',
            idx === selected ? 'text-title-3' : 'text-body-1',
            disabled
              ? 'text-mss-selected-disabled-label cursor-default'
              : 'text-mss-selected-default-label cursor-pointer',
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
