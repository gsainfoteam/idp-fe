import { ClientAddFrame } from '@/features/client';
import { createFileRoute } from '@tanstack/react-router';

const ClientAddPage = () => {
  return <ClientAddFrame />;
};

export const Route = createFileRoute('/_auth-required/clients/new')({
  component: ClientAddPage,
});
