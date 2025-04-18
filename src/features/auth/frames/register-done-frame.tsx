import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Button } from '@/features/core';

export function RegisterDoneFrame() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-[400px] flex-col px-5 py-6">
        <div className="text-title-1 mb-4">{t(`register_done.title`)}</div>
        <div className="text-title-3 text-neutral-900">
          {t(`register_done.description`)}
        </div>
        <div className="h-100" />
        <Link to="/auth/login">
          <Button variant="primary" type="button">
            {t(`register_done.buttons.login`)}
          </Button>
        </Link>
      </div>
    </div>
  );
}
