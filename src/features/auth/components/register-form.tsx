import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { RegisterFormSchema } from '../hooks/use-register-form';

import { Input } from './input';

export function RegisterForm() {
  const { register, formState } = useFormContext<RegisterFormSchema>();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      <div className="text-title-1 mb-4">{t(`register.title`)}</div>
      <div>
        <div className="text-title-3 mb-2.5">{t(`register.defaultInfo`)}</div>
        <div className="mb-4">
          <Input
            label={t(`register.email`)}
            error={formState.errors.email?.message}
            type="email"
            placeholder="m@gm.gist.ac.kr"
            required
            {...register('email')}
          />
        </div>
        <div className="mb-4">
          <Input
            label={t(`register.password`)}
            error={formState.errors.password?.message}
            type="password"
            placeholder={t(`register.password`)}
            required
            {...register('password')}
          />
        </div>
        <div>
          <Input
            label={t(`register.passwordConfirm`)}
            error={formState.errors.passwordConfirm?.message}
            type="password"
            placeholder={t(`register.passwordConfirm`)}
            required
            {...register('passwordConfirm')}
          />
        </div>
      </div>
      <div className="h-8" />
      <div>
        <div className="text-title-3 mb-2.5">{t(`register.defaultInfo`)}</div>
        <div className="mb-4">
          <Input
            label={t(`register.name`)}
            error={formState.errors.name?.message}
            type="text"
            placeholder={t(`register.examples.name`)}
            required
            {...register('name')}
          />
        </div>
        <div className="mb-4">
          <Input
            label={t(`register.studentId`)}
            error={formState.errors.studentId?.message}
            type="number"
            placeholder="20235000"
            required
            {...register('studentId')}
          />
        </div>
        <div>
          <Input
            label={t(`register.phoneNumber`)}
            error={formState.errors.phoneNumber?.message}
            type="tel"
            placeholder="010-0000-0000"
            {...register('phoneNumber')}
          />
        </div>
      </div>
    </div>
  );
}
