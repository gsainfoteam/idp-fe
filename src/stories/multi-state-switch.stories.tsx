import type { Meta, StoryObj } from '@storybook/react';

import { MultiStateSwitch, type MultiStateSwitchProps } from '@/features/core';

function MultiStateSwitchTestFrame({ ...props }: MultiStateSwitchProps) {
  return (
    <div className="bg-funnel-background absolute inset-0">
      <div className="flex flex-col gap-4 p-4">
        <MultiStateSwitch {...props} />
        <MultiStateSwitch {...props} />
        <MultiStateSwitch {...props} />
      </div>
    </div>
  );
}

const meta = {
  component: MultiStateSwitchTestFrame,
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof MultiStateSwitchTestFrame>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selected: 1,
    labels: ['Label 1', 'Label 2', 'Label 3'],
    disabled: false,
    className: 'w-100',
  },
};
