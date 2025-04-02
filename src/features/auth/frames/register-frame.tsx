import { FormProvider } from 'react-hook-form';

import { Button } from '../components/button';
import { RegisterForm } from '../components/register-form';
import { useRegisterForm } from '../hooks/use-register-form';

export function RegisterFrame() {
  const { form, onSubmit } = useRegisterForm();

  const hasError = Object.keys(form.formState.errors).length > 0;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex h-[800px] w-full max-w-[400px] flex-col px-5 py-6">
        <FormProvider {...form}>
          <form onSubmit={onSubmit}>
            <RegisterForm />
          </form>
        </FormProvider>
        <div className="mt-auto mb-6">
          <Button
            variant="primary"
            disabled={hasError}
            isLoading={form.formState.isSubmitting}
          >
            다음으로
          </Button>
        </div>
      </div>
    </div>
  );
}
