import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ClientAddForm } from '../components/client-add-form';
import { useAddClientForm } from '../hooks/use-add-client-form';

import { Button, FunnelLayout } from '@/features/core';

export function ClientAddFrame() {
  const { t } = useTranslation();
  const { form, handleSubmit } = useAddClientForm();

  return (
    <FunnelLayout
      title={t('services.add.title')}
      stepTitle={t('services.add.stepTitle')}
      description={t('services.add.description')}
      button={
        <Button variant="primary" className="w-full">
          {t('services.add.create')}
        </Button>
      }
    >
      <FormProvider {...form}>
        <form onSubmit={handleSubmit}>
          <ClientAddForm />
        </form>
      </FormProvider>
    </FunnelLayout>
  );
}
