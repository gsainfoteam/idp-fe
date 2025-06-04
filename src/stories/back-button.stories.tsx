import type { Meta, StoryObj } from '@storybook/react';

import { BackButton } from '@/features/core';

const meta = {
  component: BackButton,
} satisfies Meta<typeof BackButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
