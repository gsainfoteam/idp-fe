import { createFileRoute } from '@tanstack/react-router';

import { ComponentTestFrame } from '@/features/test';

const ComponentTestPage = () => {
  return <ComponentTestFrame />;
};

export const Route = createFileRoute('/component-test')({
  component: ComponentTestPage,
});
