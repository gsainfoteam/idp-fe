import { Avatar, uniqueKey } from '@/features/core';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const 임정훈: Story = {
  args: {
    seed: uniqueKey('20255182'),
    children: '임정훈'.charAt(0),
  },
};
