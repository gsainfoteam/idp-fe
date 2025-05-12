import { createFileRoute } from '@tanstack/react-router';

import { WithdrawFrame } from '@/features/profile';

const WithdrawPage = () => {
  return <WithdrawFrame />;
};

export const Route = createFileRoute('/_auth-required/withdraw')({
  component: WithdrawPage,
});
