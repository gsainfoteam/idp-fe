import { createFileRoute } from '@tanstack/react-router';

import { WithdrawFrame } from '@/features/withdraw';

const WithdrawPage = () => {
  return <WithdrawFrame />;
};

export const Route = createFileRoute('/_auth-required/withdraw')({
  component: WithdrawPage,
});
