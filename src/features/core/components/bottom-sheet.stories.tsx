import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { BottomSheet } from './bottom-sheet';
import { Button } from './button';

const meta = {
  component: BottomSheet,
  argTypes: {
    isOpen: {
      options: [true, false],
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof BottomSheet>;

export default meta;

type Story = StoryObj<typeof meta>;

const BottomSheetWithState = ({ isOpen: initialOpen }: { isOpen: boolean }) => {
  const [open, setOpen] = useState(initialOpen);

  useEffect(() => {
    setOpen(initialOpen);
  }, [initialOpen]);

  return (
    <BottomSheet isOpen={open} close={() => setOpen(false)}>
      <BottomSheet.Header>Title must be so long</BottomSheet.Header>
      <BottomSheet.Body>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non
        nulla vitae augue pellentesque mollis.
      </BottomSheet.Body>
      <BottomSheet.Footer>
        <BottomSheet.Close>
          <Button variant="secondary" className="w-full">
            Close
          </Button>
        </BottomSheet.Close>
        <BottomSheet.Close>
          <Button
            variant="primary"
            onClick={() => {
              alert('Success!');
            }}
            className="w-full"
          >
            Success
          </Button>
        </BottomSheet.Close>
      </BottomSheet.Footer>
    </BottomSheet>
  );
};

export const Default: Story = {
  args: {
    isOpen: false,
    close: () => {},
  },
  render: ({ isOpen }) => {
    return <BottomSheetWithState isOpen={isOpen} />;
  },
};
