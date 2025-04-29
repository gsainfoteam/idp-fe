import { Link } from '@tanstack/react-router';
import { useEffect, useMemo } from 'react';
import { useFormContext, Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ConsentFormSchema } from '../hooks/use-authorize-form';
import { GetClientResponse } from '../services/get-client';

import { Button, Checkbox, LoadingOverlay } from '@/features/core';

export function AuthorizeForm({ client }: { client: GetClientResponse }) {
  const { control, setValue, formState } = useFormContext<ConsentFormSchema>();
  const { t } = useTranslation();

  useEffect(() => {
    client.scopes.forEach((scope) => {
      setValue(`scopes.${scope}`, true);
    });
    client.optionalScopes.forEach((scope) => {
      setValue(`scopes.${scope}`, false);
    });
  }, [client, setValue]);

  const optionalScopeValues = useWatch<Record<string, boolean>>({
    name: client.optionalScopes.map((scope) => `scopes.${scope}`),
  });

  const allAgree = useMemo(() => {
    return optionalScopeValues.every((v) => v == true) ?? false;
  }, [optionalScopeValues]);

  const toggleAll = (checked: boolean) => {
    client.optionalScopes.forEach((scope) => {
      setValue(`scopes.${scope}`, checked, {
        shouldValidate: true,
        shouldDirty: true,
      });
    });
  };

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
            {client.scopes.map((scope) => (
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
            {client.optionalScopes.map((scope) => (
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
        <Link
          from="/authorize"
          to="/auth/login"
          search={(prev) => ({ ...prev })}
          className="w-full"
        >
          <Button variant="secondary" type="button">
            {t('authorize.buttons.cancel')}
          </Button>
        </Link>
        <Button variant="primary">{t('authorize.buttons.continue')}</Button>
      </div>
    </div>
  );
}
