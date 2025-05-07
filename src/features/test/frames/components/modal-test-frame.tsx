import { useState } from 'react';

import { Button, Modal } from '@/features/core';

export function ModalTestFrame() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h1 className="text-title-1 p-10">Modal</h1>
      <div className="ml-10 flex gap-5">
        <Button variant="primary" onClick={() => setOpen(true)}>
          Open Modal
        </Button>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Title"
        button={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => alert('Success!')}>
              Success
            </Button>
          </div>
        }
        className="h-[239px] w-[364px]"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non
        nulla vitae augue pellentesque mollis.
      </Modal>
    </div>
  );
}
