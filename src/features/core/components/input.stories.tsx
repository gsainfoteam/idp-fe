import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './input';

const meta = {
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    error: false,
    disabled: false,
    placeholder: 'm@gm.gist.ac.kr',
  },
};

export const Error: Story = {
  args: {
    error: 'Error Message',
    disabled: false,
    placeholder: 'm@gm.gist.ac.kr',
  },
};

export const Disabled: Story = {
  args: {
    error: false,
    disabled: true,
    placeholder: 'm@gm.gist.ac.kr',
  },
};
