import type { Meta, StoryObj } from '@storybook/react';

import { Button, IconButton } from '@/features/core';

import EditIcon from '@/assets/icons/solid/edit.svg?react';

const meta = {
  component: Button,
  argTypes: {
    size: {
      control: 'select',
      options: ['large', 'medium', 'small', 'none'],
    },
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
    size: 'large',
    loading: false,
    disabled: false,
  },
  render: ({ size = 'large', loading, disabled }) => (
    <ButtonGroup
      size={size ?? 'large'}
      loading={loading ?? false}
      disabled={disabled ?? false}
    />
  ),
};

const ButtonGroup = ({
  size,
  loading,
  disabled,
}: {
  size: 'large' | 'medium' | 'small' | 'none';
  loading: boolean;
  disabled: boolean;
}) => (
  <div className="bg-funnel-background absolute inset-0">
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-4">
        <Button
          variant="default"
          size={size}
          className="h-fit"
          loading={loading}
          disabled={disabled}
        >
          Default
        </Button>
        <Button
          variant="primary"
          size={size}
          className="h-fit"
          loading={loading}
          disabled={disabled}
        >
          Primary
        </Button>
        <Button
          variant="warning"
          size={size}
          className="h-fit"
          loading={loading}
          disabled={disabled}
        >
          Warning
        </Button>
        <Button
          variant="secondary"
          size={size}
          className="h-fit"
          loading={loading}
          disabled={disabled}
        >
          Secondary
        </Button>
        <Button
          variant="text"
          size={size}
          className="h-fit"
          loading={loading}
          disabled={disabled}
        >
          Text
        </Button>
        <Button
          variant="grayText"
          size={size}
          className="h-fit"
          loading={loading}
          disabled={disabled}
        >
          Gray Text
        </Button>
        <Button
          variant="link"
          size={size}
          className="h-fit"
          loading={loading}
          disabled={disabled}
        >
          Link
        </Button>
      </div>
      <div className="flex gap-4">
        <IconButton
          variant="default"
          icon={<EditIcon />}
          size={size}
          loading={loading}
          disabled={disabled}
        />
        <IconButton
          variant="primary"
          icon={<EditIcon />}
          size={size}
          loading={loading}
          disabled={disabled}
        />
        <IconButton
          variant="warning"
          icon={<EditIcon />}
          size={size}
          loading={loading}
          disabled={disabled}
        />
        <IconButton
          variant="secondary"
          icon={<EditIcon />}
          size={size}
          loading={loading}
          disabled={disabled}
        />
        <IconButton
          variant="text"
          icon={<EditIcon />}
          size={size}
          loading={loading}
          disabled={disabled}
        />
        <IconButton
          variant="grayText"
          icon={<EditIcon />}
          size={size}
          loading={loading}
          disabled={disabled}
        />
        <IconButton
          variant="link"
          icon={<EditIcon />}
          size={size}
          loading={loading}
          disabled={disabled}
        />
      </div>
    </div>
  </div>
);
