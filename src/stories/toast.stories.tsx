import type { Meta, StoryObj } from '@storybook/react';
import toast from 'react-hot-toast';

import { Button, ToastProvider } from '@/features/core';

function ToastTestFrame({ label }: { label: string }) {
  return (
    <div className="bg-funnel-background absolute inset-0">
      <div className="flex flex-col gap-4 p-4">
        <Button variant="default" onClick={() => toast(label)}>
          Show Blank Toast
        </Button>
        <Button variant="default" onClick={() => toast.success(label)}>
          Show Success Toast
        </Button>
        <Button variant="default" onClick={() => toast.error(label)}>
          Show Error Toast
        </Button>
        <Button variant="default" onClick={() => toast.loading(label)}>
          Show Loading Toast
        </Button>
      </div>
    </div>
  );
}

const meta = {
  component: ToastTestFrame,
  decorators: [
    (Story) => (
      <>
        <Story />
        <ToastProvider duration={100000} />
      </>
    ),
  ],
} satisfies Meta<typeof ToastTestFrame>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'hello',
  },
  render: ({ label }) => <ToastTestFrame label={label} />,
};
