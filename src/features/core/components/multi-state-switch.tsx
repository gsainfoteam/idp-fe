import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';

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
      className="bg-multi-state-switch-background relative flex h-fit w-full rounded-lg"
      {...props}
    >
      <motion.div
        className="bg-multi-state-switch-selected-background absolute top-0 bottom-0 rounded-lg ring-2 ring-neutral-100 ring-inset"
        animate={indicatorStyle}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
      {labels.map((label, idx) => (
        <button
          key={idx}
          ref={(el) => {
            buttonRefs.current[idx] = el;
          }}
          className={cn(
            'relative z-10 flex w-full cursor-pointer items-center justify-center rounded-lg py-3 text-center',
            idx === selected
              ? 'text-title-3 text-multi-state-switch-selected-label'
              : 'text-body-1 text-multi-state-switch-unselected-label',
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
