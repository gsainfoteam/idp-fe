import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Checkbox } from '@/features/core';

export function AuthorizeFrame() {
  const [checked, setChecked] = useState([false, false]);
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-[400px] flex-col px-5 py-8">
        <div className="text-title-1 whitespace-pre-wrap">
          {t('authorize.title')}
        </div>
        <div className="h-8" />
        <div className="text-body-2 text-neutral-800">
          {t('authorize.description')}
        </div>
        <div className="h-1" />
        <Checkbox
          checked={checked.every(Boolean)}
          onChange={() =>
            setChecked((prev) => prev.map(() => !prev.every(Boolean)))
          }
        >
          <div className="font-bold">{t('authorize.checkboxes.all-agree')}</div>
        </Checkbox>
        <div className="h-2.5" />
        <div className="rounded-lg border border-neutral-200 px-5 py-4">
          <div className="text-body-2 mb-1 text-neutral-800">
            {t('authorize.labels.required')}
          </div>
          <div className="flex flex-col gap-1 pl-1">
            <Checkbox disabled checked>
              {t('authorize.checkboxes.email')}
            </Checkbox>
            <Checkbox disabled checked>
              {t('authorize.checkboxes.name')}
            </Checkbox>
          </div>
          <div className="h-2.5" />
          <div className="text-body-2 mb-1 text-neutral-800">
            {t('authorize.labels.optional')}
          </div>
          <div className="flex flex-col gap-1 pl-1">
            <Checkbox
              checked={checked[0]}
              onChange={() =>
                setChecked((prev) => prev.map((v, i) => (i === 0 ? !v : v)))
              }
            >
              {t('authorize.checkboxes.studentId')}
            </Checkbox>
            <Checkbox
              checked={checked[1]}
              onChange={() =>
                setChecked((prev) => prev.map((v, i) => (i === 1 ? !v : v)))
              }
            >
              {t('authorize.checkboxes.phoneNumber')}
            </Checkbox>
          </div>
        </div>
        <div className="h-10" />
        <div className="flex gap-2.5">
          <Button variant="secondary">{t('authorize.buttons.cancel')}</Button>
          <Button variant="primary">{t('authorize.buttons.continue')}</Button>
        </div>
      </div>
    </div>
  );
}
