import { createFileRoute } from '@tanstack/react-router';

import { PasskeyListFrame } from '@/features/passkey';

const PasskeyListPage = () => {
  return <PasskeyListFrame />;
};

export const Route = createFileRoute('/_auth-required/passkeys/')({
  component: PasskeyListPage,
});
