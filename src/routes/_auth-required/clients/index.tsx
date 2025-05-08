import { createFileRoute } from '@tanstack/react-router';

import { ClientListFrame } from '@/features/client';

const ClientListPage = () => {
  return <ClientListFrame />;
};

export const Route = createFileRoute('/_auth-required/clients/')({
  component: ClientListPage,
});
