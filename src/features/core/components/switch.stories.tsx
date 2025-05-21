import type { Meta, StoryObj } from '@storybook/react';

import { Switch } from './switch';

const meta = {
  component: Switch,
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    disabled: false,
    trackClassName: 'bg-neutral-200',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Switch />
      <Switch trackClassName="peer-checked:bg-red-500" />
      <Switch trackClassName="peer-checked:bg-blue-500" />
    </div>
  ),
};
