import type { Meta, StoryObj } from '@storybook/react';

import { Backdrop } from './backdrop';

import Logo from '@/assets/logos/logo.svg?react';
const meta = {
  component: Backdrop,
  argTypes: {
    className: {
      options: ['bg-dimmed-20', 'bg-dimmed-50', 'bg-dimmed-80'],
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Backdrop>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    className: 'bg-dimmed-50',
    children: <Logo />,
  },
};
