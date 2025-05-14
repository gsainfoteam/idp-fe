import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { BottomSheet } from './bottom-sheet';
import { Button } from './button';

const meta = {
  component: BottomSheet,
  argTypes: {
    open: {
      options: [true, false],
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof BottomSheet>;

export default meta;

type Story = StoryObj<typeof meta>;

const BottomSheetWithState = ({ open: initialOpen }: { open: boolean }) => {
  const [open, setOpen] = useState(initialOpen);

  useEffect(() => {
    setOpen(initialOpen);
  }, [initialOpen]);

  return (
    <BottomSheet open={open} onClose={() => setOpen(false)}>
      <div className="text-title-1 w-full text-pretty text-neutral-950">
        Title must be so long
      </div>
      <div className="text-body-1 mt-2 w-full text-pretty text-neutral-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non
        nulla vitae augue pellentesque mollis.
      </div>
      <div className="mt-10 flex w-full justify-end gap-3">
        <Button
          variant="secondary"
          onClick={() => setOpen(false)}
          className="w-full"
        >
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            alert('Success!');
            setOpen(false);
          }}
          className="w-full"
        >
          Success
        </Button>
      </div>
    </BottomSheet>
  );
};

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
  },
  render: ({ open }) => {
    return <BottomSheetWithState open={open} />;
  },
};
