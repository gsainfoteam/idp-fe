import { createFileRoute } from '@tanstack/react-router';

import { PasskeyAddFrame } from '@/features/passkey';

const PasskeyAddPage = () => {
  return <PasskeyAddFrame />;
};

export const Route = createFileRoute('/_auth-required/passkeys/new')({
  component: PasskeyAddPage,
});
