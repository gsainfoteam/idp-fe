import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '../components/button';
import { RegisterForm } from '../components/register-form';
import { useRegisterForm } from '../hooks/use-register-form';

export function RegisterFrame() {
  const { form, onSubmit } = useRegisterForm();
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-[400px] flex-col px-5 py-6">
        <FormProvider {...form}>
          <form onSubmit={onSubmit}>
            <RegisterForm />
            <div className="h-16" />
            <Button
              variant="primary"
              disabled={!form.formState.isValid}
              isLoading={form.formState.isSubmitting}
            >
              {t('register.next')}
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
