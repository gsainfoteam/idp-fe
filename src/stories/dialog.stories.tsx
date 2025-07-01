import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { Button, Dialog } from '@/features/core';

const meta = {
  component: Dialog,
  argTypes: {
    isOpen: {
      options: [true, false],
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

const ExampleDialog = ({ isOpen: initialOpen }: { isOpen: boolean }) => {
  const [isOpen, setOpen] = useState(initialOpen);

  useEffect(() => {
    setOpen(initialOpen);
  }, [initialOpen]);

  return (
    <Dialog isOpen={isOpen} close={() => setOpen(false)}>
      <Dialog.Header>Title must be so long</Dialog.Header>
      <Dialog.Body>
        Lorem ipsum dolor sit amet, consectetur
        <br />
        adipiscing elit. Mauris non nulla vitae
        <br />
        augue pellentesque mollis.
      </Dialog.Body>
      <Dialog.Footer>
        <Dialog.Close>
          <Button variant="secondary" className="w-full">
            Close
          </Button>
        </Dialog.Close>
        <Dialog.Close>
          <Button
            variant="primary"
            onClick={() => {
              alert('Success!!');
            }}
            className="w-full"
          >
            Success
          </Button>
        </Dialog.Close>
      </Dialog.Footer>
    </Dialog>
  );
};

const UndoWarningDialog = ({ isOpen: initialOpen }: { isOpen: boolean }) => {
  const [open, setOpen] = useState(initialOpen);

  useEffect(() => {
    setOpen(initialOpen);
  }, [initialOpen]);

  return (
    <Dialog isOpen={open} close={() => setOpen(false)}>
      <Dialog.Header>계속 진행하면 데이터가 소실됩니다.</Dialog.Header>
      <Dialog.Body>계속 진행하시겠습니까?</Dialog.Body>
      <Dialog.Footer>
        <Dialog.Close>
          <Button variant="secondary" className="w-full">
            그만두기
          </Button>
        </Dialog.Close>
        <Dialog.Close>
          <Button variant="primary" className="w-full">
            계속하기
          </Button>
        </Dialog.Close>
      </Dialog.Footer>
    </Dialog>
  );
};

const NoBodyDialog = ({ isOpen: initialOpen }: { isOpen: boolean }) => {
  const [open, setOpen] = useState(initialOpen);

  useEffect(() => {
    setOpen(initialOpen);
  }, [initialOpen]);

  return (
    <Dialog isOpen={open} close={() => setOpen(false)}>
      <Dialog.Header>알림을 받기 위해 앱 알림을 켤게요</Dialog.Header>
      <Dialog.Footer>
        <Dialog.Close className="flex justify-end">
          <Button variant="text">알림 켜기</Button>
        </Dialog.Close>
      </Dialog.Footer>
    </Dialog>
  );
};

export const Default: Story = {
  args: {
    isOpen: true,
    close: () => {},
  },
  render: ({ isOpen }) => {
    return (
      <div className="bg-funnel-background absolute inset-0">
        <ExampleDialog isOpen={isOpen} />
      </div>
    );
  },
};

export const UndoWarning: Story = {
  args: {
    isOpen: true,
    close: () => {},
  },
  render: ({ isOpen }) => {
    return (
      <div className="bg-funnel-background absolute inset-0">
        <UndoWarningDialog isOpen={isOpen} />
      </div>
    );
  },
};

export const NoBody: Story = {
  args: {
    isOpen: true,
    close: () => {},
  },
  render: ({ isOpen }) => {
    return (
      <div className="bg-funnel-background absolute inset-0">
        <NoBodyDialog isOpen={isOpen} />
      </div>
    );
  },
};
