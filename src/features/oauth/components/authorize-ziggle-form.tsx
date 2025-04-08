import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ConsentFormSchema } from '../hooks/use-consent-form';

import { Button, Checkbox } from '@/features/core';

const ziggleRequiredScopes = ['email', 'name'] as const;
const ziggleOptionalScopes = ['student_id', 'phone_number'] as const;

export function AuthorizeForm({
  onSubmit,
}: {
  onSubmit: (e?: React.SyntheticEvent) => void;
}) {
  const { register, setValue, watch, getValues } =
    useFormContext<ConsentFormSchema>();
  const { t } = useTranslation();
  const [allAgree, setAllAgree] = useState(false);

  setValue('client_id', 'ziggle2023');
  ziggleRequiredScopes.forEach((scope) => setValue(scope, true));

  useEffect(() => {
    setAllAgree(ziggleOptionalScopes.every((scope) => watch(scope)));
    console.log('allAgree', allAgree); // TESTING
  }, [watch, allAgree]);

  return (
    <div className="flex flex-col">
      <Checkbox
        defaultChecked={allAgree}
        onChange={() => {
          ziggleOptionalScopes.forEach((scope) => setValue(scope, !allAgree));
          setAllAgree((prev) => !prev);
          console.log(getValues()); // TESTING
        }}
      >
        <div className="font-bold">{t('authorize.checkboxes.all_agree')}</div>
      </Checkbox>
      <div className="h-2.5" />
      <div className="rounded-lg border border-neutral-200 px-5 py-4">
        <div className="text-body-2 mb-1 text-neutral-800">
          {t('authorize.labels.required')}
        </div>
        <div className="flex flex-col gap-1 pl-1">
          {ziggleRequiredScopes.map((scope) => (
            <Checkbox key={scope} disabled {...register(scope)}>
              {t(`authorize.checkboxes.${scope}`)}
            </Checkbox>
          ))}
        </div>
        <div className="h-2.5" />
        <div className="text-body-2 mb-1 text-neutral-800">
          {t('authorize.labels.optional')}
        </div>
        <div className="flex flex-col gap-1 pl-1">
          {ziggleOptionalScopes.map((scope) => (
            <Checkbox key={scope} {...register(scope)}>
              {t(`authorize.checkboxes.${scope}`)}
            </Checkbox>
          ))}
        </div>
      </div>
      <div className="h-10" />
      <div className="flex gap-2.5">
        <Button variant="secondary">{t('authorize.buttons.cancel')}</Button>
        <Button variant="primary" onClick={onSubmit}>
          {t('authorize.buttons.continue')}
        </Button>
      </div>
    </div>
  );
}
