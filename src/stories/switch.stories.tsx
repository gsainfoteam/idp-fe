import type { Meta, StoryObj } from '@storybook/react';

import { Switch } from '@/features/core';

const meta = {
  component: Switch,
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Multiple: Story = {
  args: {
    disabled: false,
  },
  render: ({ disabled }) => (
    <div className="bg-funnel-background absolute inset-0">
      <div className="flex flex-col gap-4 p-4">
        <Switch disabled={disabled} />
        <Switch disabled={disabled} trackClassName="peer-checked:bg-red-500" />
        <Switch disabled={disabled} trackClassName="peer-checked:bg-blue-500" />
      </div>
    </div>
  ),
};
