import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ClientDetailsFormSchema } from '../hooks/use-client-details-form';

import { Button, Input } from '@/features/core';

export function ClientUrlsForm() {
  const { t } = useTranslation();
  const { control, register, setValue } =
    useFormContext<ClientDetailsFormSchema>();

  const urls = useWatch({ control, name: 'urls' });

  useEffect(() => {
    if (urls.every((url) => url !== '')) {
      setValue('urls', [...urls, '']);
    }
  }, [setValue, urls]);

  return (
    <div className="flex flex-col gap-4">
      <div className="text-title-3">{t('services.detail.urls.title')}</div>
      <div className="flex flex-col gap-5">
        {urls.map((url, index) => (
          <div className="flex items-center gap-2" key={index}>
            <Input
              className="flex-1"
              placeholder={t('services.detail.urls.placeholder')}
              {...register(`urls.${index}`)}
            />
            <Button
              variant="default"
              key={url}
              onClick={() =>
                setValue(
                  'urls',
                  urls.filter((_, i) => i !== index),
                )
              }
            >
              -
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
