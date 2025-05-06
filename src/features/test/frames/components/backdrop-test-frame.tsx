import { useState } from 'react';

import Logo from '@/assets/logos/logo.svg?react';
import { Backdrop, Button } from '@/features/core';

export function BackdropTestFrame() {
  const [isOpen, setIsOpen] = useState([false, false, false]);

  return (
    <div>
      <h1 className="text-title-1 m-10">Backdrop</h1>
      <div className="ml-10 flex gap-5">
        <Button
          variant="primary"
          onClick={() => setIsOpen([true, false, false])}
        >
          Open Backdrop 20%
        </Button>
        <Button
          variant="secondary"
          onClick={() => setIsOpen([false, true, false])}
        >
          Open Backdrop 50%
        </Button>
        <Button
          variant="default"
          onClick={() => setIsOpen([false, false, true])}
        >
          Open Backdrop 80%
        </Button>
      </div>
      <Backdrop
        className="bg-dimmed-20"
        open={isOpen[0]!}
        onClose={() => setIsOpen([false, false, false])}
      >
        <Logo />
      </Backdrop>
      <Backdrop
        className="bg-dimmed-50"
        open={isOpen[1]!}
        onClose={() => setIsOpen([false, false, false])}
      >
        <Logo />
      </Backdrop>
      <Backdrop
        className="bg-dimmed-80"
        open={isOpen[2]!}
        onClose={() => setIsOpen([false, false, false])}
      >
        <Logo />
      </Backdrop>
    </div>
  );
}
