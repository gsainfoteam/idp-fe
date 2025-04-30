import { useSearch } from '@tanstack/react-router';
import { useEffect, useMemo } from 'react';
import { useFormContext, Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ConsentFormSchema } from '../hooks/use-authorize-form';
import { ClientResponse } from '../services/get-client';

import { Button, Checkbox, LoadingOverlay } from '@/features/core';

export function AuthorizeForm({ client }: { client: ClientResponse }) {
  const { control, setValue, formState } = useFormContext<ConsentFormSchema>();
  const { t } = useTranslation();
  const { scopes: clientScopes } = useSearch({
    from: '/_auth-required/authorize',
  });

  const scopes = clientScopes.filter(client.scopes.includes);
  const optionalScopes = clientScopes.filter(client.optionalScopes.includes);

  const optionalScopeValues = useWatch<Record<string, boolean>>({
    name: optionalScopes.map((scope) => `scopes.${scope}`),
  });

  const allAgree = useMemo(() => {
    return optionalScopeValues.every(Boolean) ?? false;
  }, [optionalScopeValues]);

  const toggleAll = (checked: boolean) => {
    optionalScopes.forEach((scope) => {
      setValue(`scopes.${scope}`, checked, {
        shouldValidate: true,
        shouldDirty: true,
      });
    });
  };

  useEffect(() => {
    scopes.forEach((scope) => {
      setValue(`scopes.${scope}`, true);
    });
    optionalScopes.forEach((scope) => {
      setValue(`scopes.${scope}`, false);
    });
  }, [scopes, optionalScopes, setValue]);

  return (
    <div className="flex flex-col">
      <LoadingOverlay show={formState.isSubmitting}>
        <Checkbox checked={allAgree} onChange={() => toggleAll(!allAgree)}>
          <div className="font-bold">{t('authorize.checkboxes.all_agree')}</div>
        </Checkbox>
        <div className="h-2.5" />
        <div className="rounded-lg border border-neutral-200 px-5 py-4">
          <div className="text-body-2 mb-1 text-neutral-800">
            {t('authorize.labels.required')}
          </div>
          <div className="flex flex-col gap-1 pl-1">
            {scopes.map((scope) => (
              <Controller
                key={scope}
                name={`scopes.${scope}`}
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    disabled
                    onChange={field.onChange}
                  >
                    {t(`authorize.checkboxes.${scope}`)}
                  </Checkbox>
                )}
              />
            ))}
          </div>
          <div className="h-2.5" />
          <div className="text-body-2 mb-1 text-neutral-800">
            {t('authorize.labels.optional')}
          </div>
          <div className="flex flex-col gap-1 pl-1">
            {optionalScopes.map((scope) => (
              <Controller
                key={scope}
                name={`scopes.${scope}`}
                control={control}
                render={({ field }) => (
                  <Checkbox checked={field.value} onChange={field.onChange}>
                    {t(`authorize.checkboxes.${scope}`)}
                  </Checkbox>
                )}
              />
            ))}
          </div>
        </div>
      </LoadingOverlay>
      <div className="h-10" />
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
        <Button variant="primary">{t('authorize.buttons.continue')}</Button>
      </div>
    </div>
  );
}
