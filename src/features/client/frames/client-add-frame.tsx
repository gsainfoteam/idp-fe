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
            <div className="flex flex-col items-center gap-4">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://infoteam-rulrudino.notion.site/GSA-OAuth2-OIDC-fa09594e4b2548758e1343c84d7da008?pvs=4"
              >
                <Button variant="link" type="button">
                  {t('services.add.help')}
                </Button>
              </a>
              <Button
                variant="primary"
                className="w-full"
                loading={form.formState.isSubmitting}
              >
                {t('services.add.create')}
              </Button>
            </div>
          }
        >
          <ClientAddForm />
        </FunnelLayout>
      </form>
    </FormProvider>
  );
}
