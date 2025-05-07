import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Button, FunnelLayout } from '@/features/core';

// TODO: 프로필

export function CompleteStep() {
  const { t } = useTranslation();

  return (
    <FunnelLayout
      title={t('register.title')}
      stepTitle={t('register.steps.complete.title')}
      button={
        <Link to="/auth/login" search={(prev) => ({ ...prev })}>
          <Button variant="primary" className="w-full">
            {t('register.steps.complete.button')}
          </Button>
        </Link>
      }
    />
  );
}
