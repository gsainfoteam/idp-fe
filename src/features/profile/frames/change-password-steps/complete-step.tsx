import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/features/auth';
import { Avatar, Button, FunnelLayout, uniqueKey } from '@/features/core';

export function CompleteStep() {
  const { t } = useTranslation();
  const { user } = useAuth();

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
          <Button variant="primary" className="w-full">
            {t('change_password.steps.complete.button')}
          </Button>
        </Link>
      }
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Avatar size={32} name={user.name} seed={uniqueKey(user.studentId)} />
        <div className="mt-3 flex flex-col items-center">
          <div className="text-title-1 text-center text-neutral-950">
            {user.name}
          </div>
          <div className="text-body-1 text-center text-neutral-400">
            {user.email}
          </div>
        </div>
      </div>
    </FunnelLayout>
  );
}
