import { FormProvider } from 'react-hook-form';

import { Button } from '../components/button';
import { RegisterForm } from '../components/register-form';
import { useRegisterForm } from '../hooks/use-register-form';

export function RegisterFrame() {
  const { form, onSubmit } = useRegisterForm();

  const hasError = Object.keys(form.formState.errors).length > 0;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col w-full h-[800px] px-5 py-6 max-w-[400px]">
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
