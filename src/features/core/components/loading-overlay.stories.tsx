import type { Meta, StoryObj } from '@storybook/react';

import { LoadingOverlay } from './loading-overlay';

const meta = {
  component: LoadingOverlay,
} satisfies Meta<typeof LoadingOverlay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    show: true,
    children: 'Loading...',
  },
};
