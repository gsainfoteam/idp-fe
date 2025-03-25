import { useFormContext } from 'react-hook-form';

import { LoginFormSchema } from '../hooks/use-login-form';

export const LoginForm = () => {
  const { register, formState } = useFormContext<LoginFormSchema>();

  return (
    <div className="flex flex-col">
      <input
        {...register('email')}
        type="email"
        placeholder="m@gm.gist.ac.kr"
      />
      {formState.errors.email?.message}
      <input {...register('password')} type="password" placeholder="password" />
      {formState.errors.password?.message}
    </div>
  );
};
