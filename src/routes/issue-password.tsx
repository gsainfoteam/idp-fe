import { createFileRoute } from '@tanstack/react-router';

import { IssuePasswordFrame } from '@/features/profile';

const IssuePasswordPage = () => {
  return <IssuePasswordFrame />;
};

export const Route = createFileRoute('/issue-password')({
  component: IssuePasswordPage,
});
