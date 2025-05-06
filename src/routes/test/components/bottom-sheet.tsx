import { createFileRoute } from '@tanstack/react-router';

import { BottomSheetTestFrame } from '@/features/test';

const BottomSheetTestPage = () => {
  return <BottomSheetTestFrame />;
};

export const Route = createFileRoute('/test/components/bottom-sheet')({
  component: BottomSheetTestPage,
});
