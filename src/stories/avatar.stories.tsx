import type { Meta, StoryObj } from '@storybook/react';

import { Avatar, uniqueKey } from '@/features/core';

const meta = {
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const 임정훈: Story = {
  args: {
    name: '임정훈',
    seed: uniqueKey('20255182'),
  },
};
