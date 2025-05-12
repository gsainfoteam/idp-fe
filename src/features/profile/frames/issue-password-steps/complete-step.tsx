import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import thumbsUpImg from '@/assets/icons/color/thumbs-up.png';
import { Button, FunnelLayout } from '@/features/core';

export function CompleteStep() {
  const { t } = useTranslation();

  return (
    <FunnelLayout
      title={t('issue_password.title')}
      stepTitle={t('issue_password.steps.complete.title')}
      hideUndo
      button={
        <Link
          to="/auth/login"
          search={(prev) =>
            Object.fromEntries(
              Object.entries(prev).filter(([key]) => !key.endsWith('-step')),
            )
          }
        >
          <Button variant="primary" className="w-full">
            {t('issue_password.steps.complete.button')}
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
