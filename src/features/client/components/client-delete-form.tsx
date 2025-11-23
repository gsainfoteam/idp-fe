import { useNavigate } from '@tanstack/react-router';
import { overlay } from 'overlay-kit';
import { useTranslation } from 'react-i18next';

import TrashBinIcon from '@/assets/icons/solid/trash-bin.svg?react';
import { Button, LogClick } from '@/features/core';

import { Client } from '../hooks/use-client';
import { ClientDeleteOverlay } from './client-delete-overlay';

export function ClientDeleteForm({ client }: { client: Client }) {
  const { t } = useTranslation();
  const navigate = useNavigate({ from: '/clients/$id' });

  return (
    <div className="flex flex-col gap-4">
      <div className="text-title-3 text-basics-primary-label">
        {t('services.detail.delete.title')}
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <LogClick
            event="client_delete_button"
            properties={{ clientId: client.clientId }}
          >
            <Button
              variant="warning"
              disabled={client.deleteRequestedAt != null}
              prefixIcon={<TrashBinIcon />}
              onClick={async () => {
                const result = await overlay.openAsync<boolean>(
                  ({ isOpen, close }) => (
                    <ClientDeleteOverlay
                      client={client}
                      isOpen={isOpen}
                      close={close}
                    />
                  ),
                );

                if (result) {
                  navigate({ to: '/clients' });
                }
              }}
            >
              {t('services.detail.delete.button')}
            </Button>
          </LogClick>
        </div>
      </div>
    </div>
  );
}
