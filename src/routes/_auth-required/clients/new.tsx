import { createFileRoute } from '@tanstack/react-router';

import { ClientAddFrame } from '@/features/client';

const ClientAddPage = () => {
  return <ClientAddFrame />;
};

export const Route = createFileRoute('/_auth-required/clients/new')({
  component: ClientAddPage,
});
