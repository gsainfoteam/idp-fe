import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    disabled: false,
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    disabled: false,
    children: 'Button',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Button',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    disabled: false,
    children: 'Button',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    disabled: false,
    children: 'Button',
  },
};
