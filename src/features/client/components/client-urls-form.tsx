import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ClientDetailsFormSchema } from '../hooks/use-client-details-form';

import PlusIcon from '@/assets/icons/line/add.svg?react';
import TrashBinIcon from '@/assets/icons/solid/trash-bin.svg?react';

import { IconButton, Input } from '@/features/core';
import { useClientUrlForm } from '../hooks/use-client-url-form';

export function ClientUrlsForm() {
  const { t } = useTranslation();
  const { watch, setValue } = useFormContext<ClientDetailsFormSchema>();
  const { form: urlForm, reset } = useClientUrlForm();

  const urls = watch('urls');
  const newUrl = urlForm.watch('newUrl');

  return (
    <div className="flex flex-col gap-4">
      <div className="text-title-3 text-basics-primary-label">
        {t('services.detail.urls.title')}
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-2">
          <Input
            className="flex-1"
            type="url"
            placeholder={t('services.detail.urls.placeholder')}
            error={urlForm.formState.errors.newUrl?.message}
            {...urlForm.register('newUrl')}
          />
          <Controller
            control={urlForm.control}
            name="newUrl"
            render={({ fieldState }) => (
              <IconButton
                variant="primary"
                disabled={fieldState.invalid || !fieldState.isDirty}
                onClick={() => {
                  setValue('urls', [newUrl, ...(urls ?? [])], {
                    shouldDirty: true,
                  });
                  reset();
                }}
                icon={<PlusIcon className="text-basics-primary-label" />}
              />
            )}
          />
        </div>
        {urls.length > 0 && (
          <div className="border-basics-tertiary-label flex flex-col gap-3 rounded-lg border px-4 py-3">
            {urls.map((url, index) => (
              <div className="flex flex-col gap-3" key={index}>
                <div className="flex items-center gap-3">
                  <div className="text-body-1 text-basics-primary-label flex-1">
                    {url}
                  </div>
                  <IconButton
                    variant="text"
                    className="p-0"
                    icon={<TrashBinIcon width={30} height={30} />}
                    onClick={() =>
                      setValue(
                        'urls',
                        urls.filter((_, i) => i !== index),
                        { shouldDirty: true },
                      )
                    }
                  />
                </div>
                {index !== urls.length - 1 && (
                  <div className="bg-funnel-separator h-[1px] w-full" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
