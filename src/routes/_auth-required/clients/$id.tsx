import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { ClientDetailFrame } from '@/features/client';

const ClientDetailPage = () => {
  return <ClientDetailFrame />;
};

export const Route = createFileRoute('/_auth-required/clients/$id')({
  component: ClientDetailPage,
  params: z.object({ id: z.string() }),
});
