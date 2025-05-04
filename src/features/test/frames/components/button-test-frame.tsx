import ArrowLeftIcon from '@/assets/icons/arrow-left.svg?react';
import CheckIcon from '@/assets/icons/check.svg?react';
import { Button } from '@/features/core';

export function ButtonTestFrame() {
  return (
    <div>
      <h1 className="text-title-1 p-10">Button</h1>
      <div className="flex gap-5 px-10">
        <Button variant="primary">Contained</Button>
        <Button variant="secondary">Outlined</Button>
        <Button variant="default">Default</Button>
        <Button variant="text">Text</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="h-5" />
      <div className="flex gap-5 px-10">
        <Button variant="primary" loading>
          Contained
        </Button>
        <Button variant="secondary" loading>
          Outlined
        </Button>
        <Button variant="default" loading>
          Default
        </Button>
        <Button variant="text" loading>
          Text
        </Button>
        <Button variant="link" loading>
          Link
        </Button>
      </div>
      <div className="h-5" />
      <div className="flex gap-5 px-10">
        <Button variant="primary" disabled>
          Contained
        </Button>
        <Button variant="secondary" disabled>
          Outlined
        </Button>
        <Button variant="default" disabled>
          Default
        </Button>
        <Button variant="text" disabled>
          Text
        </Button>
        <Button variant="link" disabled>
          Link
        </Button>
      </div>
      <div className="h-5" />
      <div className="flex gap-5 px-10">
        <Button variant="primary" prefixIcon={<ArrowLeftIcon />}>
          Back
        </Button>
        <Button variant="primary" suffixIcon={<CheckIcon />}>
          Checked
        </Button>
      </div>
    </div>
  );
}
