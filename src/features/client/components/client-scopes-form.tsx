import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ClientDetailsFormSchema } from '../hooks/use-client-details-form';

import { MultiStateSwitch } from '@/features/core';

const choices = ['no', 'optional', 'required'] as const;
type Choice = (typeof choices)[number];

const ScopeSwitch = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: Choice;
  onChange: (choice: Choice) => void;
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2">
      <div>{label}</div>
      <MultiStateSwitch
        selected={choices.indexOf(value)}
        onChangeIndex={(index) => onChange(choices[index] as Choice)}
        labels={[
          t('services.detail.scopes.choices.no'),
          t('services.detail.scopes.choices.optional'),
          t('services.detail.scopes.choices.required'),
        ]}
      />
    </div>
  );
};

export function ClientScopesForm() {
  const { t } = useTranslation();
  const { control } = useFormContext<ClientDetailsFormSchema>();

  return (
    <div className="flex flex-col gap-4">
      <div className="text-title-3">{t('services.detail.scopes.title')}</div>
      <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name="scopes.profile"
          render={({ field }) => (
            <ScopeSwitch
              label={t('services.detail.scopes.type.profile')}
              {...field}
              value={field.value ?? 'no'}
            />
          )}
        />
        <Controller
          control={control}
          name="scopes.student_id"
          render={({ field }) => (
            <ScopeSwitch
              label={t('services.detail.scopes.type.student_id')}
              {...field}
              value={field.value ?? 'no'}
            />
          )}
        />
        <Controller
          control={control}
          name="scopes.email"
          render={({ field }) => (
            <ScopeSwitch
              label={t('services.detail.scopes.type.email')}
              {...field}
              value={field.value ?? 'no'}
            />
          )}
        />
        <Controller
          control={control}
          name="scopes.phone_number"
          render={({ field }) => (
            <ScopeSwitch
              label={t('services.detail.scopes.type.phone_number')}
              {...field}
              value={field.value ?? 'no'}
            />
          )}
        />
      </div>
    </div>
  );
}
