import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ClientAddForm } from '../components/client-add-form';
import { useAddClientForm } from '../hooks/use-add-client-form';

import { Button, FunnelLayout } from '@/features/core';

export function ClientAddFrame({
  onSuccess,
}: {
  onSuccess: (client: { clientId: string; clientSecret: string }) => void;
}) {
  const { t } = useTranslation();
  const { form, handleSubmit } = useAddClientForm({ onSuccess });

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit}>
        <FunnelLayout
          title={t('services.add.title')}
          stepTitle={t('services.add.stepTitle')}
          description={t('services.add.description')}
          loading={form.formState.isSubmitting}
          button={
            <Button
              variant="primary"
              className="w-full"
              loading={form.formState.isSubmitting}
            >
              {t('services.add.create')}
            </Button>
          }
        >
          <ClientAddForm />
        </FunnelLayout>
      </form>
    </FormProvider>
  );
}
