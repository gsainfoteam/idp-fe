import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { Backdrop } from './backdrop';
import Logo from '@/assets/logos/logo.svg?react';

const meta = {
  component: Backdrop,
  argTypes: {
    isOpen: {
      options: [true, false],
      control: { type: 'boolean' },
    },
    className: {
      options: ['bg-dimmed-20', 'bg-dimmed-50', 'bg-dimmed-80'],
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
      <Logo />
    </Backdrop>
  );
};

export const Default: Story = {
  args: {
    isOpen: true,
    close: () => {},
    className: 'bg-dimmed-50',
  },
  render: ({ isOpen: open, className }) => {
    return <BackdropWithState open={open} className={className} />;
  },
};
