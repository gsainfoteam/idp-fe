import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { BottomSheet, Button, FunnelLayout } from '@/features/core';

type BottomSheetStoryProps = {
  isOpen: boolean;
  header: string;
  body: string;
};

const BottomSheetWithState = ({
  isOpen: initialOpen,
  header,
  body,
}: BottomSheetStoryProps) => {
  const [open, setOpen] = useState(initialOpen);

  useEffect(() => {
    setOpen(initialOpen);
  }, [initialOpen]);

  return (
    <>
      <FunnelLayout
        title="Bottom Sheet"
        stepTitle="Step Title"
        button={
          <Button variant="primary" onClick={() => setOpen(true)}>
            Open
          </Button>
        }
      >
        Hello World
      </FunnelLayout>
      <BottomSheet isOpen={open} close={() => setOpen(false)}>
        <BottomSheet.Header>{header}</BottomSheet.Header>
        <BottomSheet.Body>{body}</BottomSheet.Body>
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
    </>
  );
};

const meta = {
  component: BottomSheetWithState,
  argTypes: {
    isOpen: {
      options: [true, false],
      control: { type: 'boolean' },
    },
    header: { control: 'text' },
    body: { control: 'text' },
  },
} satisfies Meta<typeof BottomSheetWithState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: false,
    header: 'Bottom Sheet',
    body: 'A bottom sheet is a modal that appears from the bottom of the screen.',
  },
};
