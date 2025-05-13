import type { Meta, StoryObj } from '@storybook/react';

import { LoadingEllipse } from './loading-ellipse';

const meta = {
  component: LoadingEllipse,
} satisfies Meta<typeof LoadingEllipse>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: 'bg-neutral-600',
  },
};

export const Primary: Story = {
  args: {
    className: 'bg-neutral-200',
  },
};

export const Secondary: Story = {
  args: {
    className: 'bg-primary-600',
  },
};
