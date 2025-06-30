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
  const { clientScopes, consents } = useLoaderData({
    from: '/_auth-required/authorize',
  });
  const consent = consents?.data?.list.find(
    (c) => c.clientUuid === client.clientId,
  );

  const requiredScopes = useMemo(
    () => clientScopes.filter((v) => client.scopes.includes(v)),
    [clientScopes, client.scopes],
  );
  const requiredScopeValues = useWatch({
    name: requiredScopes.map((scope) => `scopes.${scope}` as const),
  });
  const requiredAllAgree = useMemo(
    () => requiredScopeValues.every(Boolean),
    [requiredScopeValues],
  );
  const toggleRequiredAll = (checked: boolean) => {
    requiredScopes.forEach((scope) => setValue(`scopes.${scope}`, checked));
  };

  const optionalScopes = useMemo(
    () => clientScopes.filter((v) => client.optionalScopes.includes(v)),
    [clientScopes, client.optionalScopes],
  );
  const optionalScopeValues = useWatch({
    name: optionalScopes.map((scope) => `scopes.${scope}` as const),
  });
  const optionalAllAgree = useMemo(
    () => optionalScopeValues.every(Boolean),
    [optionalScopeValues],
  );
  const toggleOptionalAll = (checked: boolean) => {
    optionalScopes.forEach((scope) => setValue(`scopes.${scope}`, checked));
  };

  const allAgree = useMemo(
    () => requiredAllAgree && optionalAllAgree,
    [requiredAllAgree, optionalAllAgree],
  );

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
      setValue(`scopes.${scope}`, consent?.scopes.includes(scope) ?? false);
    });
    optionalScopes.forEach((scope) => {
      setValue(`scopes.${scope}`, consent?.scopes.includes(scope) ?? false);
    });
  }, [requiredScopes, optionalScopes, setValue, consent]);

  return (
    <div className="flex flex-col">
      <Checkbox
        checked={allAgree}
        onChange={() => {
          toggleRequiredAll(!allAgree);
          toggleOptionalAll(!allAgree);
        }}
      >
        <div className="font-bold">{t('authorize.checkboxes.all_agree')}</div>
      </Checkbox>
      <div className="h-2.5" />
      <div className="flex flex-col gap-2.5 rounded-lg border border-neutral-200 px-5 py-4">
        {requiredScopes.length > 0 && (
          <div className="flex flex-col gap-1">
            <div
              className="text-body-2 text-neutral-800"
              onClick={() => toggleRequiredAll(!requiredAllAgree)}
            >
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
          </div>
        )}
        {optionalScopes.length > 0 && (
          <div className="flex flex-col gap-1">
            <div
              className="text-body-2 text-neutral-800"
              onClick={() => toggleOptionalAll(!optionalAllAgree)}
            >
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
        )}
      </div>
    </div>
  );
}
