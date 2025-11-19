import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { deleteUser } from '@/data/user';

import { useClientList } from '../use-client-list';

const schema = z.object({
  password: z.string().min(1),
});

export function useConfirmWithdrawalForm({
  onNext,
  context,
}: {
  onNext: () => void;
  context: { password: string };
}) {
  const { t } = useTranslation();
  const { clients, isLoading, error } = useClientList();
  const { formState, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { password: context.password },
  });

  const onSubmit = handleSubmit(async (formData) => {
    const res = await deleteUser({ password: formData.password });

    if (!res.ok) {
      if (res.status === 500) {
        toast.error(t('toast.server_error'));
      } else {
        toast.error(t('toast.unknown_error'));
      }

      return;
    }

    onNext();
  });

  return {
    clients,
    isLoading: isLoading || formState.isSubmitting,
    error: error || formState.errors,
    onSubmit,
  };
}
