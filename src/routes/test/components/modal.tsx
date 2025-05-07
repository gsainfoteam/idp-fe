import { createFileRoute } from '@tanstack/react-router';

import { ModalTestFrame } from '@/features/test';

const ModalTestPage = () => {
  return <ModalTestFrame />;
};

export const Route = createFileRoute('/test/components/modal')({
  component: ModalTestPage,
});
