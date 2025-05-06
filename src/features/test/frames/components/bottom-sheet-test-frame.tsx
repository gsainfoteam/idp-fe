import { useState } from 'react';

import { BottomSheet, Button } from '@/features/core';

export function BottomSheetTestFrame() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h1 className="text-title-1 p-10">Bottom Sheet</h1>
      <div className="ml-10 flex gap-5">
        <Button variant="primary" onClick={() => setOpen(true)}>
          Open Bottom Sheet
        </Button>
      </div>
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title="Title"
        button={
          <div className="flex w-full gap-3">
            <Button
              variant="secondary"
              onClick={() => setOpen(false)}
              className="w-full"
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => alert('Success!')}
              className="w-full"
            >
              Success
            </Button>
          </div>
        }
        className="h-[233px] w-[349px]"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non
        nulla vitae augue pellentesque mollis.
      </BottomSheet>
    </div>
  );
}
