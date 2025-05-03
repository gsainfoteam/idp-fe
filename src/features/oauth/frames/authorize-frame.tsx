import { useLoaderData, useSearch } from '@tanstack/react-router';
import { useCallback, useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AuthorizeForm } from '../components/authorize-form';
import { useAuthorizeForm } from '../hooks/use-authorize-form';
import { useClient } from '../hooks/use-client';

import { getUserConsent } from '@/data/get-user-consent';
import { Button, FunnelStep } from '@/features/core';

export function AuthorizeFrame() {
  const { form, onSubmit } = useAuthorizeForm();
  const { t } = useTranslation();
  const { clientId, scopes } = useLoaderData({
    from: '/_auth-required/authorize',
  });
  const { client } = useClient(clientId);
  const { prompt, ...search } = useSearch({
    from: '/_auth-required/authorize',
  });

  const [isLoading, setLoading] = useState(true);

  const authorize = useCallback(() => {
    window.location.href = `${import.meta.env.VITE_API_URL}/oauth/authorize?${new URLSearchParams(search).toString()}`;
  }, [search]);

  useEffect(() => {
    // scope에 offline_access가 없을 때, 유저가 이미 인가를 한 경우 인가 페이지 패스
    const checkConsent = async () => {
      if (!scopes.includes('offline_access') && !prompt) {
        const { data, error } = await getUserConsent();

        if (!data || error) throw error;
        if (data.list.some((c) => c.clientUuid === clientId)) {
          authorize();
          return;
        }
      }

      setLoading(false);
    };

    checkConsent();
  }, [authorize, clientId, prompt, scopes]);

  // TODO: Loading, Error 상태에 대한 UI를 추가해야 함 -> 모달 컴포넌트로 Error 메시지 띄우기, Loading Spinner 띄우기
  if (isLoading || !client) {
    return <div />;
  } else {
    return (
      <FunnelStep
        hideUndo
        isLoading={form.formState.isSubmitting}
        title={t('authorize.title')}
        stepTitle={t('authorize.step_title', { client: client.name })}
        description={t('authorize.description', { client: client.name })}
        button={
          <div className="flex gap-2.5">
            <Button
              variant="secondary"
              type="button"
              onClick={() => {
                // TODO: 취소 페이지 UI
                window.close();
              }}
            >
              {t('authorize.buttons.cancel')}
            </Button>
            <Button
              variant="primary"
              type="button"
              onClick={async (e) => {
                await onSubmit(e);
                authorize();
              }}
            >
              {t('authorize.buttons.continue')}
            </Button>
          </div>
        }
      >
        <FormProvider {...form}>
          <form>
            <AuthorizeForm client={client} />
          </form>
        </FormProvider>
      </FunnelStep>
    );
  }
}
