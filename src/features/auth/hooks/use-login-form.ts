import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { login } from '../services/use-login';

const schema = z.object({
  email: z.string().email('이메일 형식이 아닙니다'),
  password: z.string().min(1, '비밀번호를 확인해주세요'),
});

export type LoginFormSchema = z.infer<typeof schema>;

export const useLoginForm = () => {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const response = await login(data);

      console.log(response.accessToken); // TEST: DEBUG
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        form.setError('email', { message: ' ' });
        form.setError('password', {
          message: '이메일 또는 비밀번호를 확인해주세요',
        });
      } else {
        console.error(error);
      }
    }
  });

  return { form, onSubmit };
};
