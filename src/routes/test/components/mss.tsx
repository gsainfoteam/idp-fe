import { createFileRoute } from '@tanstack/react-router';

import { MultiStateSwitchTestFrame } from '@/features/test';

const MultiStateSwitchTestPage = () => {
  return <MultiStateSwitchTestFrame />;
};

export const Route = createFileRoute('/test/components/mss')({
  component: MultiStateSwitchTestPage,
});
