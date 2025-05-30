import type { Meta, StoryObj } from '@storybook/react';

import { Button, IconButton } from '@/features/core';

import EditIcon from '@/assets/icons/solid/edit.svg?react';

const meta = {
  component: Button,
  argTypes: {
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {
    variant: 'default',
    loading: false,
    disabled: false,
  },
  render: ({ loading, disabled }) => (
    <ButtonGroup loading={loading ?? false} disabled={disabled ?? false} />
  ),
};

const ButtonGroup = ({
  loading,
  disabled,
}: {
  loading: boolean;
  disabled: boolean;
}) => (
  <div className="bg-funnel-background absolute inset-0">
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-4">
        <Button variant="default" loading={loading} disabled={disabled}>
          Default
        </Button>
        <Button variant="primary" loading={loading} disabled={disabled}>
          Primary
        </Button>
        <Button variant="secondary" loading={loading} disabled={disabled}>
          Secondary
        </Button>
        <Button variant="text" loading={loading} disabled={disabled}>
          Text
        </Button>
        <Button variant="link" loading={loading} disabled={disabled}>
          Link
        </Button>
      </div>
      <div className="flex gap-4">
        <IconButton
          variant="default"
          icon={<EditIcon />}
          loading={loading}
          disabled={disabled}
        />
        <IconButton
          variant="primary"
          icon={<EditIcon />}
          loading={loading}
          disabled={disabled}
        />
        <IconButton
          variant="secondary"
          icon={<EditIcon />}
          loading={loading}
          disabled={disabled}
        />
        <IconButton
          variant="text"
          icon={<EditIcon />}
          loading={loading}
          disabled={disabled}
        />
        <IconButton
          variant="link"
          icon={<EditIcon />}
          loading={loading}
          disabled={disabled}
        />
      </div>
    </div>
  </div>
);
