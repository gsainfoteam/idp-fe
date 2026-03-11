import { useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useEmailForm } from '../../hooks/issue-password-steps/use-email-form';

import { Button, FunnelLayout, Input, Label } from '@/features/core';

export function EmailStep(props: Parameters<typeof useEmailForm>[0]) {
  const {
    form: { register, control },
    onCheckEmail,
    onSubmit,
  } = useEmailForm(props);
  const { isSubmitting, isValid, isDirty, errors } = useFormState({ control });
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (await onCheckEmail()) {
      await onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FunnelLayout
        loading={isSubmitting}
        title={t('issue_password.title')}
        stepTitle={t('issue_password.steps.email.title')}
        description={t('issue_password.steps.email.description')}
        button={
          <Button
            variant="primary"
            className="w-full"
            loading={isSubmitting}
            disabled={!(isValid && isDirty)}
          >
            {t('issue_password.steps.email.button')}
          </Button>
        }
      >
        <Label text={t('issue_password.steps.email.inputs.email.label')}>
          <Input
            type="email"
            placeholder={t(
              'issue_password.steps.email.inputs.email.placeholder',
            )}
            error={errors.email?.message}
            disabled={isSubmitting}
            {...register('email')}
          />
        </Label>
      </FunnelLayout>
    </form>
  );
}
