import type { Meta, StoryObj } from '@storybook/react';

import { BottomSheet } from './bottom-sheet';

const meta = {
  component: BottomSheet,
} satisfies Meta<typeof BottomSheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
    children: 'Bottom Sheet Content',
  },
};
