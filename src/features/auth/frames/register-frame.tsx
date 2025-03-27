import { FormProvider } from 'react-hook-form';

import { RegisterForm } from '../components/register-form';
import { useRegisterForm } from '../hooks/use-register-form';

export const RegisterFrame = () => {
  const { form, onSubmit } = useRegisterForm();
  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <RegisterForm />
      </form>
    </FormProvider>
  );
};
