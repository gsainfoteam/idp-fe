import { createFileRoute } from '@tanstack/react-router';

import { RegisterDoneFrame } from '@/features/auth';

const RegisterDonePage = () => {
  return <RegisterDoneFrame />;
};

export const Route = createFileRoute('/auth/register/done')({
  component: RegisterDonePage,
});
