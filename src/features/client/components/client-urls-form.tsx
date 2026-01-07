import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type Client } from '../hooks/use-client';
import { type ClientDetailsFormSchema } from '../hooks/use-client-details-form';
import { useClientMembers } from '../hooks/use-client-members';
import { useClientUrlForm } from '../hooks/use-client-url-form';
import { hasRoleAtLeast } from '../utils/role';

import PlusIcon from '@/assets/icons/line/add.svg?react';
import TrashBinIcon from '@/assets/icons/solid/trash-bin.svg?react';
import { cn, IconButton, Input } from '@/features/core';

export function ClientUrlsForm({ client }: { client: Client }) {
  const { t } = useTranslation();
  const { watch, setValue } = useFormContext<ClientDetailsFormSchema>();
  const { form: urlForm, reset } = useClientUrlForm();
  const { currentUserRoleNumber } = useClientMembers(client.clientId);

  const urls = watch('urls');
  const newUrl = urlForm.watch('newUrl');
  const isDeleted = client.deleteRequestedAt != null;
  const canManage = hasRoleAtLeast(currentUserRoleNumber, 'ADMIN');

  return (
    <div className="flex flex-col gap-4">
      <div className="text-title-3 text-basics-primary-label">
        {t('services.detail.urls.title')}
      </div>
      <div className="flex flex-col gap-5">
        {urls.length > 0 && (
          <div className="border-basics-tertiary-label flex flex-col gap-4 rounded-lg border p-4">
            {urls.map((url, index) => (
              <div className="flex flex-col gap-3" key={index}>
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'text-body-1 flex-1',
                      isDeleted
                        ? 'text-basics-secondary-label'
                        : 'text-basics-primary-label',
                    )}
                  >
                    {url}
                  </div>
                  <IconButton
                    variant="grayText"
                    size="none"
                    disabled={isDeleted || !canManage}
                    icon={<TrashBinIcon />}
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
                  <div className="bg-funnel-separator h-px w-full" />
                )}
              </div>
            ))}
          </div>
        )}
        <div className="flex items-start gap-2">
          <Input
            className="flex-1"
            type="url"
            placeholder={t('services.detail.urls.placeholder')}
            error={urlForm.formState.errors.newUrl?.message}
            disabled={isDeleted || !canManage}
            {...urlForm.register('newUrl')}
          />
          <Controller
            control={urlForm.control}
            name="newUrl"
            render={({ fieldState }) => (
              <IconButton
                variant="primary"
                className="h-fit"
                disabled={
                  fieldState.invalid ||
                  !fieldState.isDirty ||
                  isDeleted ||
                  !canManage
                }
                onClick={() => {
                  setValue('urls', [newUrl, ...(urls ?? [])], {
                    shouldDirty: true,
                  });
                  reset();
                }}
                icon={<PlusIcon />}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
