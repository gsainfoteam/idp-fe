import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { login } from '../services/use-login';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type LoginFormSchema = z.infer<typeof schema>;

export const useLoginForm = () => {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = form.handleSubmit(async (data) => {
    login(data).catch((error) => {
      if (error instanceof AxiosError && error.status === 401) {
        form.setError('email', {});
        form.setError('password', {
          message: '잘못된 이메일과 비밀번호입니다',
        });
      } else {
        console.error(error);
      }
    });
  });

  return { form, onSubmit };
};
