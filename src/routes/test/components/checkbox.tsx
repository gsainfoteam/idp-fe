import { createFileRoute } from '@tanstack/react-router';

import { CheckboxTestFrame } from '@/features/test';

const CheckboxTestPage = () => {
  return <CheckboxTestFrame />;
};

export const Route = createFileRoute('/test/components/checkbox')({
  component: CheckboxTestPage,
});
