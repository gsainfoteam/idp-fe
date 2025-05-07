import { createFileRoute } from '@tanstack/react-router';

import { InputTestFrame } from '@/features/test';

const InputTestPage = () => {
  return <InputTestFrame />;
};

export const Route = createFileRoute('/test/components/input')({
  component: InputTestPage,
});
