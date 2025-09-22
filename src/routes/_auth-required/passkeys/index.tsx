import { PasskeyListFrame } from '@/features/passkey';
import { createFileRoute } from '@tanstack/react-router';

const PasskeyListPage = () => {
  return <PasskeyListFrame />;
};

export const Route = createFileRoute('/_auth-required/passkeys/')({
  component: PasskeyListPage,
});
