import type { Meta, StoryObj } from '@storybook/react';

import { MultiStateSwitch } from '@/features/core';

const meta = {
  component: MultiStateSwitch,
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof MultiStateSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selected: 1,
    labels: ['Label 1', 'Label 2', 'Label 3'],
    disabled: false,
    className: 'w-100',
  },
};
