import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/features/auth';
import { Avatar, Button, FunnelLayout, uniqueKey } from '@/features/core';

import { useConfirmWithdrawalForm } from '../../hooks/steps/use-confirm-withdrawal-form';

export function ConfirmStep({
  onNext,
  context,
}: {
  onNext: () => void;
  context: { password: string; email: string; name: string; studentId: string };
}) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { clients, isLoading, onSubmit } = useConfirmWithdrawalForm({
    onNext,
    context,
  });

  // impossible to happen
  if (!user) throw new Error('User not found');

  if (!clients) return null;

  return (
    <form onSubmit={onSubmit}>
      <FunnelLayout
        title={t('withdraw.title')}
        stepTitle={t('withdraw.steps.confirm.title')}
        description={
          clients
            ? clients.length
              ? t('withdraw.steps.confirm.description')
              : t('withdraw.steps.confirm.description_without_services')
            : undefined
        }
        loading={isLoading}
        button={
          <div className="grid grid-cols-2 gap-2">
            <Link to="/">
              <Button
                variant="secondary"
                className="w-full"
                type="button"
                loading={isLoading}
              >
                {t('withdraw.steps.confirm.sub_button')}
              </Button>
            </Link>
            <Button
              className="w-full"
              variant="warning"
              disabled={!clients}
              loading={isLoading}
            >
              {t('withdraw.steps.confirm.button')}
            </Button>
          </div>
        }
      >
        <div className="flex flex-col gap-3">
          {clients.length ? (
            <div className="flex flex-col gap-6">
              <div className="flex h-fit w-full items-center gap-3 px-3">
                <Avatar
                  img={user.picture ?? undefined}
                  seed={uniqueKey(user.studentId)}
                >
                  {user.name.charAt(0)}
                </Avatar>
                <div className="flex flex-col">
                  <div className="text-title-3 text-basics-primary-label">
                    {user.name}
                  </div>
                  <div className="text-body-2 text-basics-secondary-label">
                    {user.email}
                  </div>
                </div>
              </div>
              <div className="border-basics-tertiary-label flex flex-col rounded-lg border">
                {clients.map((client) => (
                  <div
                    className="flex items-center gap-3 p-3"
                    key={client.clientId}
                  >
                    <Avatar
                      size={10}
                      img={client.picture ?? undefined}
                      seed={uniqueKey(client.clientId)}
                      className="shrink-0 rounded-lg"
                    >
                      {client.name.charAt(0)}
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="text-title-3 text-basics-primary-label truncate">
                        {client.name}
                      </div>
                      <div className="text-label-2 text-basics-secondary-label truncate">
                        ID: {client.clientId}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Avatar
                size={32}
                img={user.picture ?? undefined}
                seed={uniqueKey(context.studentId.toString())}
              >
                {context.name.charAt(0)}
              </Avatar>
              <div className="mt-3 flex flex-col items-center">
                <div className="text-title-1 text-basics-primary-label text-center">
                  {context.name}
                </div>
                <div className="text-body-1 text-basics-secondary-label text-center">
                  {context.email}
                </div>
              </div>
            </div>
          )}
        </div>
      </FunnelLayout>
    </form>
  );
}
