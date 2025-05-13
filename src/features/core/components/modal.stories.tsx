import type { Meta, StoryObj } from '@storybook/react';

import { Modal } from './modal';

const meta = {
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
    children: 'Modal Content',
  },
};
