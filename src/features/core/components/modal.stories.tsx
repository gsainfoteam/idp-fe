import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from './button';
import { Modal } from './modal';

const meta = {
  component: Modal,
  argTypes: {
    open: {
      options: [true, false],
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

const ModalWithState = ({ open: initialOpen }: { open: boolean }) => {
  const [open, setOpen] = useState(initialOpen);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className="text-title-1 w-full text-pretty text-neutral-950">
        Title must be so long
      </div>
      <div className="text-body-1 mt-2 w-full text-pretty text-neutral-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non
        nulla vitae augue pellentesque mollis.
      </div>
      <div className="mt-10 flex w-full justify-end gap-3">
        <Button variant="secondary" onClick={() => setOpen(false)}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            alert('Success!');
            setOpen(false);
          }}
        >
          Success
        </Button>
      </div>
    </Modal>
  );
};

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
    children: 'Modal Content',
  },
  render: ({ open }) => {
    return <ModalWithState open={open} />;
  },
};
