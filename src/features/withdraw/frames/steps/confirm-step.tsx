import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { useConfirmWithdrawalForm } from '../../hooks/steps/use-confirm-withdrawal-form';

import { Avatar, Button, FunnelLayout, uniqueKey } from '@/features/core';
import { useAuth } from '@/features/auth';

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
              variant="primary"
              className="w-full bg-red-600"
              disabled={!clients}
              loading={isLoading}
            >
              {t('withdraw.steps.confirm.button')}
            </Button>
          </div>
        }
      >
        <div className="flex flex-col gap-3">
          {/* TODO: add loading and error */}
          {clients.length ? (
            <div className="flex flex-col gap-6">
              <div className="flex h-fit w-full items-center gap-3 px-3">
                <Avatar
                  name={user.name}
                  img={user.picture ?? undefined}
                  seed={uniqueKey(user.studentId)}
                />
                <div className="flex flex-col">
                  <div className="text-title-3">{user.name}</div>
                  <div className="text-body-2 text-neutral-400">
                    {user.email}
                  </div>
                </div>
              </div>
              <div className="flex flex-col rounded-lg border border-neutral-100">
                {clients.map((client) => (
                  <div
                    className="flex items-center gap-3 p-3"
                    key={client.clientId}
                  >
                    <Avatar
                      size={10}
                      img={client.picture ?? undefined}
                      name={client.name}
                      seed={uniqueKey(client.clientId)}
                      className="shrink-0 rounded-lg"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-title-3 truncate text-neutral-900">
                        {client.name}
                      </div>
                      <div className="text-label-2 truncate text-neutral-400">
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
                name={context.name}
                seed={uniqueKey(context.studentId.toString())}
              />
              <div className="mt-3 flex flex-col items-center">
                <div className="text-title-1 text-center text-neutral-950">
                  {context.name}
                </div>
                <div className="text-body-1 text-center text-neutral-400">
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
