import { useRouter } from '@tanstack/react-router';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ClientAddForm } from '../components/client-add-form';
import { useAddClientForm } from '../hooks/use-add-client-form';

import { Button, FunnelLayout, LogClick } from '@/features/core';

export function ClientAddFrame() {
  const router = useRouter();
  const { t } = useTranslation();
  const { form, onSubmit } = useAddClientForm({
    onSuccess: () => router.history.back(),
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
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
              <LogClick event="client_create_button">
                <Button
                  variant="primary"
                  className="w-full"
                  loading={form.formState.isSubmitting}
                >
                  {t('services.add.create')}
                </Button>
              </LogClick>
            </div>
          }
        >
          <ClientAddForm />
        </FunnelLayout>
      </form>
    </FormProvider>
  );
}
