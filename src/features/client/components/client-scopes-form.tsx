import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ClientDetailsFormSchema } from '../hooks/use-client-details-form';

import { Client } from '../hooks/use-client';
import { Label, MultiStateSwitch } from '@/features/core';

const choices = ['no', 'optional', 'required'] as const;
type Choice = (typeof choices)[number];

const ScopeSwitch = ({
  label,
  value,
  disabled = false,
  onChange,
}: {
  label: string;
  value: Choice;
  disabled?: boolean;
  onChange: (choice: Choice) => void;
}) => {
  const { t } = useTranslation();

  return (
    <Label text={label}>
      <MultiStateSwitch
        selected={choices.indexOf(value)}
        disabled={disabled}
        onChangeIndex={(index) => onChange(choices[index] as Choice)}
        labels={[
          t('services.detail.scopes.choices.no'),
          t('services.detail.scopes.choices.optional'),
          t('services.detail.scopes.choices.required'),
        ]}
      />
    </Label>
  );
};

export function ClientScopesForm({ client }: { client: Client }) {
  const { t } = useTranslation();
  const { control } = useFormContext<ClientDetailsFormSchema>();

  return (
    <div className="flex flex-col gap-4">
      <div className="text-title-3 text-basics-primary-label">
        {t('services.detail.scopes.title')}
      </div>
      <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name="scopes.profile"
          render={({ field: { value, disabled, ...field } }) => (
            <ScopeSwitch
              label={t('services.detail.scopes.type.profile')}
              disabled={disabled || client.deleteRequestedAt != null}
              value={value ?? 'no'}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="scopes.student_id"
          render={({ field: { value, disabled, ...field } }) => (
            <ScopeSwitch
              label={t('services.detail.scopes.type.student_id')}
              disabled={disabled || client.deleteRequestedAt != null}
              value={value ?? 'no'}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="scopes.email"
          render={({ field: { value, disabled, ...field } }) => (
            <ScopeSwitch
              label={t('services.detail.scopes.type.email')}
              disabled={disabled || client.deleteRequestedAt != null}
              value={value ?? 'no'}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="scopes.phone_number"
          render={({ field: { value, disabled, ...field } }) => (
            <ScopeSwitch
              label={t('services.detail.scopes.type.phone_number')}
              disabled={disabled || client.deleteRequestedAt != null}
              value={value ?? 'no'}
              {...field}
            />
          )}
        />
      </div>
    </div>
  );
}
