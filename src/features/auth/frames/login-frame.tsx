import { FormProvider } from 'react-hook-form';

import { LoginForm } from '../components/login-form';
import { useLoginForm } from '../hooks/use-login-form';

export const LoginFrame = () => {
  const { form, onSubmit } = useLoginForm();
  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <LoginForm />
      </form>
    </FormProvider>
  );
};
