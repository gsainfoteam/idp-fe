import { createFileRoute } from '@tanstack/react-router';

import { ClientAddFrame } from '@/features/client';

const ClientAddPage = () => {
  const navigate = Route.useNavigate();
  return (
    <ClientAddFrame
      onSuccess={(client) =>
        navigate({
          to: '/clients/$id',
          params: { id: client.clientId },
        })
      }
    />
  );
};

export const Route = createFileRoute('/_auth-required/clients/new')({
  component: ClientAddPage,
});
