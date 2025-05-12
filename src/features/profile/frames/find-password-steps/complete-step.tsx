import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import thumbsUpImg from '@/assets/icons/color/thumbs-up.png';
import { Button, FunnelLayout } from '@/features/core';

export function CompleteStep() {
  const { t } = useTranslation();

  return (
    <FunnelLayout
      title={t('find_password.title')}
      stepTitle={t('find_password.steps.complete.title')}
      hideUndo
      button={
        <Link to="/auth/login" search={(prev) => ({ ...prev })}>
          <Button variant="primary" className="w-full">
            {t('find_password.steps.complete.button')}
          </Button>
        </Link>
      }
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <img src={thumbsUpImg} className="size-[125px] opacity-40" />
      </div>
    </FunnelLayout>
  );
}
