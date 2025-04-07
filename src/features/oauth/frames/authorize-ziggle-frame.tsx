import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AuthorizeForm } from '../components/authorize-ziggle-form';
import { useAuthorizeForm } from '../hooks/use-consent-form';

export function AuthorizeFrame() {
  const { form, onSubmit } = useAuthorizeForm();
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-[400px] flex-col px-5 py-8">
        <div className="text-title-1 whitespace-pre-wrap">
          {t('authorize.title')}
        </div>
        <div className="h-8" />
        <div className="text-body-2 text-neutral-800">
          {t('authorize.description')}
        </div>
        <div className="h-1" />
        <FormProvider {...form}>
          <form>
            <AuthorizeForm onSubmit={onSubmit} />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
