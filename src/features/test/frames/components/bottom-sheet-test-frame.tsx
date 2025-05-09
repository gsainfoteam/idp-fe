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
    </div>
  );
}
