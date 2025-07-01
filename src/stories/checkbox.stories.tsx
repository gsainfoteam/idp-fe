import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox, CheckboxProps } from '@/features/core';

const CheckboxWithLabel = ({
  label,
  ...props
}: CheckboxProps & { label: string }) => {
  return (
    <div className="bg-funnel-background absolute inset-0">
      <div className="flex flex-col gap-4 p-4">
        <Checkbox {...props}>{label}</Checkbox>
        <Checkbox {...props}>{label}</Checkbox>
        <Checkbox {...props}>{label}</Checkbox>
        <Checkbox {...props}>{label}</Checkbox>
      </div>
    </div>
  );
};

const meta = {
  component: CheckboxWithLabel,
} satisfies Meta<typeof CheckboxWithLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Checkbox',
    disabled: false,
  },
};
