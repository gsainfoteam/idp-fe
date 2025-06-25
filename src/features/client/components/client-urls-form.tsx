import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ClientDetailsFormSchema } from '../hooks/use-client-details-form';

import PlusIcon from '@/assets/icons/line/add.svg?react';
import TrashBinIcon from '@/assets/icons/solid/trash-bin.svg?react';

import { Button, Input } from '@/features/core';
import { useClientUrlForm } from '../hooks/use-client-url-form';
import { Client } from '../hooks/use-client';

export function ClientUrlsForm({ client }: { client: Client }) {
  const { t } = useTranslation();
  const { watch, setValue } = useFormContext<ClientDetailsFormSchema>();
  const { form: urlForm, reset } = useClientUrlForm();

  const urls = watch('urls');
  const newUrl = urlForm.watch('newUrl');

  return (
    <div className="flex flex-col gap-4">
      <div className="text-title-3">{t('services.detail.urls.title')}</div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-2">
          <Input
            className="flex-1"
            type="url"
            placeholder={t('services.detail.urls.placeholder')}
            error={urlForm.formState.errors.newUrl?.message}
            disabled={client.deleteRequestedAt != null}
            {...urlForm.register('newUrl')}
          />
          <Controller
            control={urlForm.control}
            name="newUrl"
            render={({ fieldState }) => (
              <Button
                variant="primary"
                className="h-fit px-3"
                disabled={
                  fieldState.invalid ||
                  !fieldState.isDirty ||
                  client.deleteRequestedAt != null
                }
                onClick={() => {
                  setValue('urls', [newUrl, ...(urls ?? [])], {
                    shouldDirty: true,
                  });
                  reset();
                }}
                prefixIcon={
                  <PlusIcon width={28} height={28} className="text-white" />
                }
              />
            )}
          />
        </div>
        {urls.length > 0 && (
          <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 px-4 py-3">
            {urls.map((url, index) => (
              <div className="flex flex-col gap-3" key={index}>
                <div className="flex items-center gap-3">
                  <div className="text-body-1 flex-1">{url}</div>
                  <Button
                    variant="text"
                    className="p-0"
                    disabled={client.deleteRequestedAt != null}
                    prefixIcon={
                      <TrashBinIcon
                        width={30}
                        height={30}
                        className="h-full text-neutral-200 active:text-neutral-300"
                      />
                    }
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
                  <div className="h-[1px] w-full bg-neutral-200" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
