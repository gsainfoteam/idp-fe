import { createFileRoute } from '@tanstack/react-router';

import { ComponentTestFrame } from '@/features/auth';

const ComponentTestPage = () => {
  return <ComponentTestFrame />;
};

export const Route = createFileRoute('/auth/component-test')({
  component: ComponentTestPage,
});
