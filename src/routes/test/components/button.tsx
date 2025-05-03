import { createFileRoute } from '@tanstack/react-router';

import { ButtonTestFrame } from '@/features/test';

const ButtonTestPage = () => {
  return <ButtonTestFrame />;
};

export const Route = createFileRoute('/test/components/button')({
  component: ButtonTestPage,
});
