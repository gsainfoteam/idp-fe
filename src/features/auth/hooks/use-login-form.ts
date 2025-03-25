import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return { form, onSubmit };
};
