import ChevronRightIcon from '@/assets/icons/line/chevron-right.svg?react';
import KeyIcon from '@/assets/icons/line/key.svg?react';
import AlertOctagonIcon from '@/assets/icons/solid/alert-octagon.svg?react';
import { Avatar, SwipeCard, cn, uniqueKey } from '@/features/core';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: SwipeCard,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof SwipeCard>;

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
    children: (
      <>
        <div className="text-title-3 text-basics-primary-label truncate">
          <div className="flex items-center gap-1">
            Chrome - MacIntel (2025. 10. 1.)
          </div>
        </div>
        <div className="text-label-2 text-basics-secondary-label truncate">
          Last used: 2025-10-01 14:30:25
        </div>
      </>
    ),
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
    children: (
      <>
        <div className="text-title-3 text-basics-primary-label truncate">
          <div className="flex items-center gap-1">Ziggle</div>
        </div>
        <div className="text-label-2 text-basics-secondary-label truncate">
          ID: 1234567890
        </div>
      </>
    ),
    action: (
      <ChevronRightIcon className="text-basics-secondary-label shrink-0" />
    ),
    className: 'max-w-md',
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
    children: (
      <>
        <div
          className={cn(
            'text-title-3 text-basics-primary-label truncate',
            'text-red-700 dark:text-red-400',
          )}
        >
          <div className="flex items-center gap-1">
            <AlertOctagonIcon width={20} height={20} />
            Ziggle
          </div>
        </div>
        <div
          className={cn(
            'text-label-2 text-basics-secondary-label truncate',
            'text-red-300 dark:text-red-400/50',
          )}
        >
          ID: 1234567890
        </div>
      </>
    ),
    action: (
      <ChevronRightIcon
        className={cn(
          'text-basics-secondary-label shrink-0',
          'text-red-300 dark:text-red-400/80',
        )}
      />
    ),
    className:
      'border-red-300 bg-red-50 dark:border-red-800/50 dark:bg-red-900/10 max-w-md',
  },
};

export const CardList: Story = {
  args: {
    avatar: <div />,
  },
  render: () => (
    <div className="flex flex-col gap-3 max-w-md">
      <SwipeCard
        avatar={
          <Avatar
            size={10}
            seed={uniqueKey('multi-1')}
            className="shrink-0 rounded-lg"
          >
            <KeyIcon />
          </Avatar>
        }
      >
        <div className="text-title-3 text-basics-primary-label truncate">
          <div className="flex items-center gap-1">
            Chrome - MacIntel (2025. 10. 1.)
          </div>
        </div>
        <div className="text-label-2 text-basics-secondary-label truncate">
          Last used: 2025-10-01 14:30:25
        </div>
      </SwipeCard>
      <SwipeCard
        avatar={
          <Avatar
            size={10}
            seed={uniqueKey('multi-2')}
            className="shrink-0 rounded-lg"
          >
            <KeyIcon />
          </Avatar>
        }
      >
        <div className="text-title-3 text-basics-primary-label truncate">
          <div className="flex items-center gap-1">
            Safari - iPhone (2025. 9. 28.)
          </div>
        </div>
        <div className="text-label-2 text-basics-secondary-label truncate">
          Last used: 2025-09-28 09:15:42
        </div>
      </SwipeCard>
      <SwipeCard
        avatar={
          <Avatar
            size={10}
            seed={uniqueKey('multi-3')}
            className="shrink-0 rounded-lg"
          >
            <KeyIcon />
          </Avatar>
        }
      >
        <div className="text-title-3 text-basics-primary-label truncate">
          <div className="flex items-center gap-1">
            1Password - iPad (2025. 9. 25.)
          </div>
        </div>
        <div className="text-label-2 text-basics-secondary-label truncate">
          Last used: 2025-09-25 16:22:13
        </div>
      </SwipeCard>
    </div>
  ),
};

export const SwipeActionCard: Story = {
  args: {
    avatar: (
      <Avatar
        size={10}
        seed={uniqueKey('swipe-1')}
        className="shrink-0 rounded-lg"
      >
        <KeyIcon />
      </Avatar>
    ),
    children: (
      <>
        <div className="text-title-3 text-basics-primary-label truncate">
          <div className="flex items-center gap-1">
            Chrome - MacIntel (2025. 10. 1.)
          </div>
        </div>
        <div className="text-label-2 text-basics-secondary-label truncate">
          Last used: 2025-10-01 14:30:25
        </div>
      </>
    ),
    leftActions: [
      {
        bg: '#22c55e',
        content: 'Edit',
        onClick: async () => alert('Edit action clicked'),
      },
    ],
    rightActions: [
      {
        bg: '#ef4444',
        content: 'Delete',
        onClick: async () => alert('Delete action clicked'),
      },
    ],
  },

  render: (args) => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 w-md">
        <SwipeCard {...args} />
        <SwipeCard {...args} />
        <SwipeCard {...args} />
      </div>
      <div className="flex flex-col gap-3 w-[500px]">
        <SwipeCard {...args} />
        <SwipeCard {...args} />
        <SwipeCard {...args} />
      </div>
    </div>
  ),
};

export const MultipleActionsCard: Story = {
  args: {
    avatar: (
      <Avatar
        size={10}
        seed={uniqueKey('multi-actions')}
        className="shrink-0 rounded-lg"
      >
        <KeyIcon />
      </Avatar>
    ),
    children: (
      <>
        <div className="text-title-3 text-basics-primary-label truncate">
          <div className="flex items-center gap-1">Multiple Actions Test</div>
        </div>
        <div className="text-label-2 text-basics-secondary-label truncate">
          Swipe to see multiple actions
        </div>
      </>
    ),
  },

  render: (args) => (
    <div className="flex flex-col gap-6 max-w-lg">
      <div className="text-sm font-medium text-gray-600">
        2 Left + 2 Right Actions
      </div>
      <SwipeCard
        {...args}
        leftActions={[
          {
            bg: '#3b82f6',
            content: '📝',
            onClick: async () => alert('Edit clicked'),
          },
          {
            bg: '#10b981',
            content: '✓',
            onClick: async () => alert('Approve clicked'),
          },
        ]}
        rightActions={[
          {
            bg: '#f59e0b',
            content: '⚠️',
            onClick: async () => alert('Warning clicked'),
          },
          {
            bg: '#ef4444',
            content: '🗑️',
            onClick: async () => alert('Delete clicked'),
          },
        ]}
      />

      <div className="text-sm font-medium text-gray-600">
        3 Left Actions Only
      </div>
      <SwipeCard
        {...args}
        leftActions={[
          {
            bg: '#8b5cf6',
            content: '⭐',
            onClick: async () => alert('Star clicked'),
          },
          {
            bg: '#06b6d4',
            content: '📋',
            onClick: async () => alert('Copy clicked'),
          },
          {
            bg: '#84cc16',
            content: '📤',
            onClick: async () => alert('Share clicked'),
          },
        ]}
      >
        <div className="text-title-3 text-basics-primary-label truncate">
          <div className="flex items-center gap-1">Left Actions Only</div>
        </div>
        <div className="text-label-2 text-basics-secondary-label truncate">
          Swipe to see multiple actions
        </div>
      </SwipeCard>

      <div className="text-sm font-medium text-gray-600">
        2 Right Actions Only
      </div>
      <SwipeCard
        {...args}
        rightActions={[
          {
            bg: '#f97316',
            content: '⚙️',
            onClick: async () => alert('Settings clicked'),
          },
          {
            bg: '#dc2626',
            content: '❌',
            onClick: async () => alert('Remove clicked'),
          },
        ]}
      >
        <div className="text-title-3 text-basics-primary-label truncate">
          <div className="flex items-center gap-1">Right Actions Only</div>
        </div>
        <div className="text-label-2 text-basics-secondary-label truncate">
          Swipe to see multiple actions
        </div>
      </SwipeCard>

      <div className="text-sm font-medium text-gray-600">
        Asymmetric Actions (1 Left + 3 Right)
      </div>
      <SwipeCard
        {...args}
        leftActions={[
          {
            bg: '#059669',
            content: '💾',
            onClick: async () => alert('Save clicked'),
          },
        ]}
        rightActions={[
          {
            bg: '#7c3aed',
            content: '🏷️',
            onClick: async () => alert('Tag clicked'),
          },
          {
            bg: '#db2777',
            content: '📌',
            onClick: async () => alert('Pin clicked'),
          },
          {
            bg: '#be123c',
            content: '🔒',
            onClick: async () => alert('Lock clicked'),
          },
        ]}
      >
        <div className="text-title-3 text-basics-primary-label truncate">
          <div className="flex items-center gap-1">Asymmetric Actions</div>
        </div>
        <div className="text-label-2 text-basics-secondary-label truncate">
          Swipe to see multiple actions
        </div>
      </SwipeCard>
    </div>
  ),
};
