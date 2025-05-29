import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { Button } from './button';
import { Modal } from './modal';

const meta = {
  component: Modal,
  argTypes: {
    isOpen: {
      options: [true, false],
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

const ExampleModal = ({ isOpen: initialOpen }: { isOpen: boolean }) => {
  const [isOpen, setOpen] = useState(initialOpen);

  useEffect(() => {
    setOpen(initialOpen);
  }, [initialOpen]);

  return (
    <Modal isOpen={isOpen} close={() => setOpen(false)}>
      <Modal.Header>Title must be so long</Modal.Header>
      <Modal.Body>
        Lorem ipsum dolor sit amet, consectetur
        <br />
        adipiscing elit. Mauris non nulla vitae
        <br />
        augue pellentesque mollis.
      </Modal.Body>
      <Modal.Footer>
        <Modal.Close>
          <Button variant="secondary" className="w-full">
            Close
          </Button>
        </Modal.Close>
        <Modal.Close>
          <Button
            variant="primary"
            onClick={() => {
              alert('Success!!');
            }}
            className="w-full"
          >
            Success
          </Button>
        </Modal.Close>
      </Modal.Footer>
    </Modal>
  );
};

const UndoWarningModal = () => {
  const [open, setOpen] = useState(true);

  return (
    <Modal isOpen={open} close={() => setOpen(false)} className="mx-10 w-auto">
      <Modal.Header>계속 진행하면 데이터가 소실됩니다.</Modal.Header>
      <Modal.Body>계속 진행하시겠습니까?</Modal.Body>
      <Modal.Footer>
        <Modal.Close>
          <Button variant="secondary" className="w-full">
            그만두기
          </Button>
        </Modal.Close>
        <Modal.Close>
          <Button variant="primary" className="w-full">
            계속하기
          </Button>
        </Modal.Close>
      </Modal.Footer>
    </Modal>
  );
};

const NoBodyModal = () => {
  const [open, setOpen] = useState(true);

  return (
    <Modal isOpen={open} close={() => setOpen(false)} className="mx-10 w-auto">
      <Modal.Header>알림을 받기 위해 앱 알림을 켤게요</Modal.Header>
      <Modal.Footer>
        <Modal.Close className="flex justify-end">
          <Button variant="text">알림 켜기</Button>
        </Modal.Close>
      </Modal.Footer>
    </Modal>
  );
};

export const Default: Story = {
  args: {
    isOpen: true,
    close: () => {},
  },
  render: ({ isOpen }) => {
    return <ExampleModal isOpen={isOpen} />;
  },
};

export const UndoWarning: Story = {
  args: {
    isOpen: true,
    close: () => {},
  },
  render: () => {
    return <UndoWarningModal />;
  },
};

export const NoBody: Story = {
  args: {
    isOpen: true,
    close: () => {},
  },
  render: () => {
    return <NoBodyModal />;
  },
};
