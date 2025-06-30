import { createFileRoute } from '@tanstack/react-router';

import { ClientAddFrame } from '@/features/client';

const ClientAddPage = () => {
  const navigate = Route.useNavigate();
  return (
    <ClientAddFrame
      onSuccess={() => navigate({ to: '/clients', replace: true })}
    />
  );
};

export const Route = createFileRoute('/_auth-required/clients/new')({
  component: ClientAddPage,
});
