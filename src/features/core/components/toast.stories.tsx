import type { Meta, StoryObj } from '@storybook/react';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from './button';

const meta = {
  component: Button,
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'primary',
    children: 'Show Toast',
    onClick: () => toast.error('hello'),
  },
};
