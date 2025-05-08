import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

const ClientDetailPage = () => {
  return <div>Hello "/_auth-required/clients/$id"!</div>;
};

export const Route = createFileRoute('/_auth-required/clients/$id')({
  component: ClientDetailPage,
  params: z.object({ id: z.string() }),
});
