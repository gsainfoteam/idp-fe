import { useTranslation } from 'react-i18next';

export function ClientListFrame() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-[400px] flex-col px-5 py-6">
        <div className="flex flex-col gap-2">
          <div className="text-title-1">{t('services.list.title')}</div>
          <div className="text-body-1 text-neutral-600">
            {t('services.list.description')}
          </div>
        </div>
      </div>
    </div>
  );
}
