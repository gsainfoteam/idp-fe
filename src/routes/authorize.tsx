import { createFileRoute } from '@tanstack/react-router';

import { AuthorizeFrame } from '@/features/oauth';

const AuthorizePage = () => {
  return <AuthorizeFrame />;
};

export const Route = createFileRoute('/authorize')({
  component: AuthorizePage,
});
