import type { Meta, StoryObj } from '@storybook/react';

import { Switch } from '@/features/core';

const meta = {
  component: Switch,
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Multiple: Story = {
  render: () => (
    <div className="bg-funnel-background absolute inset-0">
      <div className="flex flex-col gap-2">
        <Switch />
        <Switch trackClassName="peer-checked:bg-red-500" />
        <Switch trackClassName="peer-checked:bg-blue-500" />
      </div>
    </div>
  ),
};
