import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import thumbsUpImg from '@/assets/icons/color/thumbs-up.png';
import { useAuth } from '@/features/auth';
import { Button, FunnelLayout } from '@/features/core';

export function CompleteStep() {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <FunnelLayout
      title={t('change_password.title')}
      stepTitle={t('change_password.steps.complete.title')}
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
          <Button variant="primary" className="w-full" onClick={signOut}>
            {t('change_password.steps.complete.button')}
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
