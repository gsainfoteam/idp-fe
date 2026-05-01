import type { Meta, StoryObj } from '@storybook/react';

import TrashBinIcon from '@/assets/icons/solid/trash-bin.svg?react';
import { IconButton, cn } from '@/features/core';

const SAMPLE_URLS = [
  'https://very-long-redirect-url.example.com/oauth/callback/production/v2',
  'https://short.io',
  'https://another-long-url.example.com/path/to/oauth/callback?query=something',
];

function UrlList({ urls }: { urls: string[] }) {
  return (
    <div className="border-basics-tertiary-label flex flex-col gap-4 rounded-lg border p-4">
      {urls.map((url, index) => (
        <div className="flex flex-col gap-3" key={index}>
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'text-body-1 text-basics-primary-label min-w-0 flex-1 truncate',
              )}
            >
              {url}
            </div>
            <IconButton
              variant="grayText"
              size="none"
              icon={<TrashBinIcon />}
            />
          </div>
          {index !== urls.length - 1 && (
            <div className="bg-funnel-separator h-px w-full" />
          )}
        </div>
      ))}
    </div>
  );
}

const meta = {
  component: UrlList,
} satisfies Meta<typeof UrlList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    urls: SAMPLE_URLS,
  },
  render: (args) => (
    <div className="bg-funnel-background p-6 w-80">
      <UrlList {...args} />
    </div>
  ),
};
