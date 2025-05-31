import type { Meta, StoryObj } from '@storybook/react';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from '@/features/core';

const meta = {
  component: Button,
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster
          toastOptions={{
            style: {
              background: 'var(--color-toast-background)',
              color: 'var(--color-toast-text)',
              border: '1px solid var(--color-toast-border)',
            },
          }}
        />
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
