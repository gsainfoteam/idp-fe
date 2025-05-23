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
              className="w-full"
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
          {clients ? (
            clients.length ? (
              clients.map((client) => (
                <div
                  className="flex items-center gap-3 rounded-lg border border-neutral-100 p-3"
                  key={client.clientId}
                >
                  <Avatar
                    size={10}
                    img={client.picture ?? undefined}
                    name={client.name}
                    seed={uniqueKey(client.clientId)}
                    className="text-title-1 rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="text-title-3 text-neutral-900">
                      {client.name}
                    </div>
                  </div>
                </div>
              ))
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
            )
          ) : null}
        </div>
      </FunnelLayout>
    </form>
  );
}
