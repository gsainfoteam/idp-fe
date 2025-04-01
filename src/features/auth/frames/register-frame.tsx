import { FormProvider } from 'react-hook-form';

import { Button } from '../components/button';
import { RegisterForm } from '../components/register-form';
import { useRegisterForm } from '../hooks/use-register-form';

export function RegisterFrame() {
  const { form, onSubmit } = useRegisterForm();

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col w-full max-w-[400px] px-5 py-6">
        <FormProvider {...form}>
          <form onSubmit={onSubmit}>
            <RegisterForm />
            <div className="h-16" />
            <Button
              variant="primary"
              disabled={!form.formState.isValid}
              isLoading={form.formState.isSubmitting}
            >
              다음으로
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
