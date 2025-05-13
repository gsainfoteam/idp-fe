import type { Meta, StoryObj } from '@storybook/react';

import { Label } from './label';

const meta = {
  component: Label,
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Label Content',
    required: false,
  },
};

export const Required: Story = {
  args: {
    text: 'Label Content',
    required: true,
  },
};
