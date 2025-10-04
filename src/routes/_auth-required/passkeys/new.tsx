import { PasskeyAddFrame } from '@/features/passkey';
import { createFileRoute } from '@tanstack/react-router';

const PasskeyAddPage = () => {
  return <PasskeyAddFrame />;
};

export const Route = createFileRoute('/_auth-required/passkeys/new')({
  component: PasskeyAddPage,
});
