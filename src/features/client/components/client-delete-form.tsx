import { useTranslation } from 'react-i18next';

import { Button, Dialog } from '@/features/core';
import { Client } from '../hooks/use-client';
import TrashBinIcon from '@/assets/icons/solid/trash-bin.svg?react';
import { useClientDeleteForm } from '../hooks/use-client-delete-form';
import { useNavigate } from '@tanstack/react-router';
import { overlay } from 'overlay-kit';

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
              const result = await overlay.openAsync(({ isOpen, close }) => (
                <Dialog
                  isOpen={isOpen}
                  close={() => close(false)}
                  className="mx-10 min-w-75"
                >
                  <Dialog.Header>
                    {t('services.detail.delete.dialog.header')}
                  </Dialog.Header>
                  <Dialog.Body>
                    {t('services.detail.delete.dialog.body')}
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.Close>
                      <Button variant="secondary" className="w-full">
                        {t('services.detail.delete.dialog.cancel')}
                      </Button>
                    </Dialog.Close>
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={() => close(true)}
                    >
                      {t('services.detail.delete.dialog.confirm')}
                    </Button>
                  </Dialog.Footer>
                </Dialog>
              ));

              if (result == true) {
                await onSubmit();
                await navigate({ to: '/clients' });
              }
            }}
          >
            {t('services.detail.delete.button')}
          </Button>
        </div>
      </div>
    </div>
  );
}
