import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { type Client } from './use-client';

const schema = z.object({
  name: z.string().refine((v) => v.trim() !== ''),
});

export const useClientNameForm = ({ client }: { client: Client }) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: client.name,
    },
    mode: 'onChange',
  });

  return { form };
};
