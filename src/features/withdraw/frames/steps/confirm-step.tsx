import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { useConfirmWithdrawalForm } from '../../hooks/steps/use-confirm-withdrawal-form';

import { Avatar, Button, FunnelLayout, uniqueKey } from '@/features/core';

export function ConfirmStep({
  onNext,
  context,
}: {
  onNext: () => void;
  context: { password: string };
}) {
  const { t } = useTranslation();
  const { consents, isLoading, onSubmit } = useConfirmWithdrawalForm({
    onNext,
    context,
  });

  return (
    <form onSubmit={onSubmit}>
      <FunnelLayout
        title={t('withdraw.title')}
        stepTitle={t('withdraw.confirm.title')}
        description={t('withdraw.confirm.description')}
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
                {t('withdraw.confirm.cancel')}
              </Button>
            </Link>
            <Button
              variant="primary"
              className="w-full"
              disabled={!consents}
              loading={isLoading}
            >
              {t('withdraw.confirm.action')}
            </Button>
          </div>
        }
      >
        <div className="flex flex-col gap-3">
          {/* TODO: add loading and error or empty status */}
          {consents?.map((consent) => (
            <div
              className="flex items-center gap-3 rounded-lg border border-neutral-100 p-3"
              key={consent.clientUuid}
            >
              <Avatar
                size={10}
                name={consent.client.name}
                seed={uniqueKey(consent.client.uuid)}
                className="text-title-1 rounded-lg"
              />
              <div className="flex-1">
                <div className="text-title-3 text-neutral-900">
                  {consent.client.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </FunnelLayout>
    </form>
  );
}
