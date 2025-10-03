import { useTranslation } from 'react-i18next';

import { Button, FunnelLayout, useLoading } from '@/features/core';
import { usePasskeyAddForm } from '@/features/passkey';

export function RegisterStep({ onNext }: { onNext: () => void }) {
  const { onSubmit } = usePasskeyAddForm({ onNext });
  const [loading, startLoading] = useLoading();
  const { t } = useTranslation();

  return (
    <FunnelLayout
      loading={loading}
      title={t('passkey.title')}
      stepTitle={t('passkey.steps.register.title')}
      description={t('passkey.steps.register.description')}
      button={
        <Button
          variant="primary"
          className="w-full"
          loading={loading}
          disabled={loading}
          onClick={() => startLoading(onSubmit)}
        >
          {t('passkey.steps.register.button')}
        </Button>
      }
    />
  );
}
