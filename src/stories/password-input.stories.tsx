import type { Meta, StoryObj } from '@storybook/react';

import { PasswordInput } from '@/features/core';

const meta = {
  component: PasswordInput,
} satisfies Meta<typeof PasswordInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
