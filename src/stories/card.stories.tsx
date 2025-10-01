import ChevronRightIcon from '@/assets/icons/line/chevron-right.svg?react';
import KeyIcon from '@/assets/icons/line/key.svg?react';
import AlertOctagonIcon from '@/assets/icons/solid/alert-octagon.svg?react';
import { Avatar, Card, cn, uniqueKey } from '@/features/core';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Card,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PasskeyCard: Story = {
  args: {
    avatar: (
      <Avatar
        size={10}
        seed={uniqueKey('passkey-1')}
        className="shrink-0 rounded-lg"
      >
        <KeyIcon />
      </Avatar>
    ),
    title: 'Chrome - MacIntel (2025. 10. 1.)',
    description: 'Last used: 2025-10-01 14:30:25',
    cardClassName: 'max-w-md',
  },
};

export const ClientCard: Story = {
  args: {
    avatar: (
      <Avatar
        size={10}
        seed={uniqueKey('passkey-1')}
        className="shrink-0 rounded-lg"
      >
        Z
      </Avatar>
    ),
    title: 'Ziggle',
    description: 'ID: 1234567890',
    action: (
      <ChevronRightIcon className="text-basics-secondary-label shrink-0" />
    ),
    cardClassName: 'max-w-md',
  },
};

export const ClientDeleteRequestedCard: Story = {
  args: {
    avatar: (
      <div className={'opacity-70 grayscale'}>
        <Avatar
          size={10}
          seed={uniqueKey('client-1')}
          className={cn('shrink-0 rounded-lg', 'border border-neutral-200')}
        >
          Z
        </Avatar>
      </div>
    ),
    title: (
      <>
        <AlertOctagonIcon width={20} height={20} />
        Ziggle
      </>
    ),
    description: 'ID: 1234567890',
    action: (
      <ChevronRightIcon
        className={cn(
          'text-basics-secondary-label shrink-0',
          'text-red-300 dark:text-red-400/80',
        )}
      />
    ),
    cardClassName:
      'border-red-300 bg-red-50 dark:border-red-800/50 dark:bg-red-900/10 max-w-md',
    titleClassName: 'text-red-700 dark:text-red-400',
    descriptionClassName: 'text-red-300 dark:text-red-400/50',
  },
};

export const CardList: Story = {
  args: {
    avatar: <div />,
    title: '',
  },
  render: () => (
    <div className="flex flex-col gap-3 max-w-md">
      <Card
        avatar={
          <Avatar
            size={10}
            seed={uniqueKey('multi-1')}
            className="shrink-0 rounded-lg"
          >
            <KeyIcon />
          </Avatar>
        }
        title="Chrome - MacIntel (2025. 10. 1.)"
        description="Last used: 2025-10-01 14:30:25"
      />
      <Card
        avatar={
          <Avatar
            size={10}
            seed={uniqueKey('multi-2')}
            className="shrink-0 rounded-lg"
          >
            <KeyIcon />
          </Avatar>
        }
        title="Safari - iPhone (2025. 9. 28.)"
        description="Last used: 2025-09-28 09:15:42"
      />
      <Card
        avatar={
          <Avatar
            size={10}
            seed={uniqueKey('multi-3')}
            className="shrink-0 rounded-lg"
          >
            <KeyIcon />
          </Avatar>
        }
        title="1Password - iPad (2025. 9. 25.)"
        description="Last used: 2025-09-25 16:22:13"
      />
    </div>
  ),
};
