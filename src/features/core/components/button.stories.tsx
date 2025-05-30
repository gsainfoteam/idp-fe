import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';

import EditIcon from '@/assets/icons/solid/edit.svg?react';
import { IconButton } from './icon-button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    loading: false,
    disabled: false,
  },
  render: () => <ButtonGroup loading={false} disabled={false} />,
};

export const Loading: Story = {
  args: {
    variant: 'default',
    loading: true,
    disabled: false,
  },
  render: () => <ButtonGroup loading={true} disabled={false} />,
};

export const Disabled: Story = {
  args: {
    variant: 'default',
    loading: false,
    disabled: true,
  },
  render: () => <ButtonGroup loading={false} disabled={true} />,
};

const ButtonGroup = ({
  loading,
  disabled,
}: {
  loading: boolean;
  disabled: boolean;
}) => (
  <div className="flex flex-col gap-4">
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
      <Button
        variant="default"
        className="px-3"
        prefixIcon={<EditIcon />}
        loading={loading}
        disabled={disabled}
      />
      <Button
        variant="primary"
        className="px-3"
        prefixIcon={<EditIcon />}
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
);
