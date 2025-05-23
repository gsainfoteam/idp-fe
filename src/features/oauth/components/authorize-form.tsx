import { useLoaderData } from '@tanstack/react-router';
import { useEffect, useMemo } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ConsentFormSchema } from '../hooks/use-authorize-form';

import { components } from '@/@types/api-schema';
import { Checkbox } from '@/features/core';

export function AuthorizeForm({
  client,
}: {
  client: components['schemas']['ClientPublicResDto'];
}) {
  const { control, setValue, setError, clearErrors } =
    useFormContext<ConsentFormSchema>();
  const { t } = useTranslation();
  const { clientScopes } = useLoaderData({
    from: '/_auth-required/authorize',
  });

  const requiredScopes = useMemo(
    () => clientScopes.filter((v) => client.scopes.includes(v)),
    [clientScopes, client.scopes],
  );
  const optionalScopes = useMemo(
    () => clientScopes.filter((v) => client.optionalScopes.includes(v)),
    [clientScopes, client.optionalScopes],
  );

  const requiredScopeValues = useWatch({
    name: requiredScopes.map((scope) => `scopes.${scope}` as const),
  });

  const optionalScopeValues = useWatch({
    name: optionalScopes.map((scope) => `scopes.${scope}` as const),
  });

  const allAgree = useMemo(
    () =>
      (requiredScopeValues.every(Boolean) &&
        optionalScopeValues.every(Boolean)) ||
      false,
    [requiredScopeValues, optionalScopeValues],
  );

  const toggleAll = (checked: boolean) => {
    requiredScopes.forEach((scope) => {
      setValue(`scopes.${scope}`, checked, {
        shouldValidate: true,
        shouldDirty: true,
      });
    });
    optionalScopes.forEach((scope) => {
      setValue(`scopes.${scope}`, checked, {
        shouldValidate: true,
        shouldDirty: true,
      });
    });
  };

  useEffect(() => {
    if (requiredScopeValues.some((v) => !v)) {
      setError('root', {
        message: t('authorize.errors.required_scopes'),
        type: 'required',
      });
    } else {
      clearErrors('root');
    }
  }, [requiredScopeValues, setError, t]);

  useEffect(() => {
    requiredScopes.forEach((scope) => {
      setValue(`scopes.${scope}`, false);
    });
    optionalScopes.forEach((scope) => {
      setValue(`scopes.${scope}`, false);
    });
  }, [requiredScopes, optionalScopes, setValue]);

  return (
    <div className="flex flex-col">
      <Checkbox checked={allAgree} onChange={() => toggleAll(!allAgree)}>
        <div className="font-bold">{t('authorize.checkboxes.all_agree')}</div>
      </Checkbox>
      <div className="h-2.5" />
      <div className="rounded-lg border border-neutral-200 px-5 py-4">
        <div className="text-body-2 mb-1 text-neutral-800">
          {t('authorize.labels.required')}
        </div>
        <div className="flex flex-col gap-1 pl-1">
          {requiredScopes.map((scope) => (
            <Controller
              key={scope}
              name={`scopes.${scope}`}
              control={control}
              render={({ field }) => (
                <Checkbox
                  checked={field.value ?? false}
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
                <Checkbox
                  checked={field.value ?? false}
                  onChange={field.onChange}
                >
                  {t(`authorize.checkboxes.${scope}`)}
                </Checkbox>
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
