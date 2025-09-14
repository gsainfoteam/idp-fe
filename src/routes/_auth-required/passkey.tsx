import { PasskeyFrame } from '@/features/profile';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth-required/passkey')({
  component: PasskeyFrame,
});
