import { useTranslation } from 'react-i18next';

import { Button } from '@/features/core';
import { Client } from '../hooks/use-client';
import TrashBinIcon from '@/assets/icons/solid/trash-bin.svg?react';
import { useClientDeleteForm } from '../hooks/use-client-delete-form';
import { useNavigate } from '@tanstack/react-router';

export function ClientDeleteForm({ client }: { client: Client }) {
  const { t } = useTranslation();
  const { onSubmit } = useClientDeleteForm(client);
  const navigate = useNavigate({ from: '/clients/$id' });

  return (
    <div className="flex flex-col gap-4">
      <div className="text-title-3">{t('services.detail.delete.title')}</div>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          {/* // TODO: idf-100 머지되면 variant="warning" 으로 바꾸기 */}
          <Button
            variant="primary"
            disabled={client.deleteRequestedAt != null}
            prefixIcon={<TrashBinIcon />}
            className="bg-red-600"
            onClick={async () => {
              await onSubmit();
              await navigate({ to: '/clients' });
            }}
          >
            {t('services.detail.delete.button')}
          </Button>
        </div>
      </div>
    </div>
  );
}
