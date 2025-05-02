import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Button, FunnelStep } from '@/features/core';

// TODO: 프로필

export function CompleteStep() {
  const { t } = useTranslation();

  return (
    <FunnelStep
      title={t('register.title')}
      stepTitle={t('register.steps.complete.title')}
      button={
        <Link to="/auth/login" search={(prev) => ({ ...prev })}>
          <Button variant="primary">
            {t('register.steps.complete.button')}
          </Button>
        </Link>
      }
    />
  );
}
