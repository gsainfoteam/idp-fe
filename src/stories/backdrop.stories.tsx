import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import Favicon from '@/assets/logos/favicon.svg?react';
import { Backdrop } from '@/features/core';

const meta = {
  component: Backdrop,
  argTypes: {
    isOpen: {
      options: [true, false],
      control: { type: 'boolean' },
    },
    className: {
      options: ['bg-black/20', 'bg-black/50', 'bg-black/80'],
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Backdrop>;

export default meta;

type Story = StoryObj<typeof meta>;

const BackdropWithState = ({
  open: initialOpen,
  className,
}: {
  open: boolean;
  className?: string;
}) => {
  const [open, setOpen] = useState(initialOpen);

  useEffect(() => {
    setOpen(initialOpen);
  }, [initialOpen]);

  return (
    <Backdrop isOpen={open} close={() => setOpen(false)} className={className}>
      <Favicon />
    </Backdrop>
  );
};

export const Default: Story = {
  args: {
    isOpen: true,
    close: () => {},
    className: 'bg-black/50',
  },
  render: ({ isOpen: open, className }) => {
    return (
      <div className="bg-funnel-background absolute inset-0">
        <BackdropWithState open={open} className={className} />
      </div>
    );
  },
};
