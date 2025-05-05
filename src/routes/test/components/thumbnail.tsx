import { createFileRoute } from '@tanstack/react-router';

import { ThumbnailTestFrame } from '@/features/test';

const ThumbnailTestPage = () => {
  return <ThumbnailTestFrame />;
};

export const Route = createFileRoute('/test/components/thumbnail')({
  component: ThumbnailTestPage,
});
