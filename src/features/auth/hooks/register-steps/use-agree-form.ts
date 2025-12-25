import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const createSchema = () =>
  z.object({
    terms: z.boolean().default(false),
    privacy: z.boolean().default(false),
  });

export type AgreeFormSchema = z.infer<ReturnType<typeof createSchema>>;

export const useAgreeForm = ({ onNext }: { onNext: () => void }) => {
  const form = useForm({
    resolver: zodResolver(createSchema()),
    mode: 'onChange',
  });

  const onSubmit = form.handleSubmit(async () => {
    onNext();
  });

  return { form, onSubmit };
};
