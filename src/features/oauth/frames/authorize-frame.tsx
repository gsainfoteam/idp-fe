import { useLoaderData } from '@tanstack/react-router';
import { FormProvider } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';

import { AuthorizeForm } from '../components/authorize-form';
import { useAuthorize } from '../hooks/use-authorize';
import { useClient } from '../hooks/use-client';

import { components } from '@/@types/api-schema';
import { Button, FunnelLayout } from '@/features/core';

export function AuthorizeFrame() {
  const { clientId } = useLoaderData({
    from: '/_auth-required/authorize',
  });
  const { client } = useClient(clientId);

  // TODO: Loading, Error 상태에 대한 UI를 추가해야 함 -> 모달 컴포넌트로 Error 메시지 띄우기, Loading Spinner 띄우기
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
          stepTitle={t('authorize.step_title', { client: client.name })}
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
              <Button variant="primary" className="w-full">
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
