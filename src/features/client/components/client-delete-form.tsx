import { useNavigate } from '@tanstack/react-router';
import { overlay } from 'overlay-kit';
import { useTranslation } from 'react-i18next';

import { type Client } from '../hooks/use-client';
import { useClientMembers } from '../hooks/use-client-members';
import { hasRoleAtLeast } from '../utils/role';

import { ClientDeleteOverlay } from './client-delete-overlay';

import TrashBinIcon from '@/assets/icons/solid/trash-bin.svg?react';
import { Button, LogClick } from '@/features/core';

export function ClientDeleteForm({ client }: { client: Client }) {
  const { t } = useTranslation();
  const { currentUserRoleNumber } = useClientMembers(client.clientId);
  const navigate = useNavigate({ from: '/clients/$id' });
  const isDeleted = client.deleteRequestedAt != null;
  const canDelete = hasRoleAtLeast(currentUserRoleNumber, 'OWNER');

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
              disabled={isDeleted || !canDelete}
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
