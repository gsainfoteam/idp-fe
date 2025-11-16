import { useLoaderData } from '@tanstack/react-router';
import { FormProvider } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';

import { components } from '@/@types/api-schema';
import { useAuth } from '@/features/auth';
import { Avatar, Button, FunnelLayout, uniqueKey } from '@/features/core';

import { AuthorizeForm } from '../components/authorize-form';
import { useAuthorize } from '../hooks/use-authorize';
import { useClient } from '../hooks/use-client';
import { useRecentLogin } from '../hooks/use-recent-login';

export function AuthorizeFrame() {
  const { clientId, prompt } = useLoaderData({
    from: '/_auth-required/authorize',
  });
  const { client } = useClient(clientId);

  const { recentLogin } = useRecentLogin();
  const { signOut } = useAuth();

  if (prompt === 'login' && !recentLogin) {
    signOut();
    return null;
  }

  if (client === undefined) {
    return null;
  } else if (client === null) {
    return (
      <div className="flex min-h-dvh items-center justify-center whitespace-pre-wrap">
        <Trans
          i18nKey="authorize.errors.invalid_request"
          parent="div"
          components={[
            <a href="https://infoteam-rulrudino.notion.site/GSA-OAuth2-OIDC-fa09594e4b2548758e1343c84d7da008?pvs=4" />,
          ]}
        />
      </div>
    );
  } else {
    return <Inner client={client} />;
  }
}

function Inner({
  client,
}: {
  client: components['schemas']['ClientPublicResDto'];
}) {
  const { t } = useTranslation();
  const { form, onSubmit, onCancel } = useAuthorize({ client });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <FunnelLayout
          hideUndo
          loading={form.formState.isSubmitting}
          stepTitle={
            <div className="flex flex-col gap-5">
              <Avatar
                img={client.picture ?? undefined}
                size={13}
                seed={uniqueKey(client.clientId)}
                className="border-basics-tertiary-label rounded-lg border"
              >
                {client.name.charAt(0)}
              </Avatar>
              {t('authorize.title', { client: client.name })}
            </div>
          }
          description={t('authorize.description', { client: client.name })}
          button={
            <div className="flex gap-2.5">
              <Button
                variant="secondary"
                className="w-full"
                type="button"
                onClick={onCancel}
              >
                {t('authorize.buttons.cancel')}
              </Button>
              <Button
                variant="primary"
                className="w-full"
                disabled={!!form.formState.errors.root}
              >
                {t('authorize.buttons.continue')}
              </Button>
            </div>
          }
        >
          <AuthorizeForm client={client} />
        </FunnelLayout>
      </form>
    </FormProvider>
  );
}
