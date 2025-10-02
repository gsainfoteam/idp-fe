import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import puzzleImage from '@/assets/icons/color/puzzle.png';
import ChevronRightIcon from '@/assets/icons/line/chevron-right.svg?react';
import AlertOctagonIcon from '@/assets/icons/solid/alert-octagon.svg?react';
import TrashBinIcon from '@/assets/icons/solid/trash-bin.svg?react';
import { postClientDelete } from '@/data/post-client-delete';
import {
  Avatar,
  Button,
  FunnelLayout,
  SwipeCard,
  cn,
  uniqueKey,
} from '@/features/core';
import { Link, useNavigate } from '@tanstack/react-router';
import { overlay } from 'overlay-kit';

import { ClientDeleteOverlay } from '../components/client-delete-form';
import { Client } from '../hooks/use-client';
import { useClientList } from '../hooks/use-client-list';

export function ClientListFrame() {
  const { t } = useTranslation();
  const { clients, refetch } = useClientList();
  const navigate = useNavigate();

  const onDelete = async (client: Client) => {
    const { status } = await postClientDelete(client.clientId);

    if (status) {
      switch (status) {
        case 'INVALID_TOKEN':
          toast.error(t('toast.invalid_token'));
          break;
        case 'INACCESSIBLE':
          toast.error(t('toast.invalid_token'));
          break;
        case 'SERVER_ERROR':
          toast.error(t('toast.server_error'));
          break;
        case 'UNKNOWN_ERROR':
          toast.error(t('toast.unknown_error'));
          break;
      }
    }
  };

  // TODO: Error Boundary + Suspense

  return (
    <FunnelLayout
      title={t('profile.menu.developer')}
      stepTitle={t('services.list.title')}
      description={t('services.list.description')}
      button={
        <Link to="/clients/new">
          <Button variant="primary" className="w-full">
            {t('services.list.add')}
          </Button>
        </Link>
      }
    >
      {clients?.length ? (
        <div className="flex flex-col gap-3">
          {clients.map((client) => (
            <SwipeCard
              key={client.clientId}
              avatar={
                <div
                  className={cn(
                    client.deleteRequestedAt != null && 'opacity-70 grayscale',
                  )}
                >
                  <Avatar
                    size={10}
                    img={client.picture ?? undefined}
                    seed={uniqueKey(client.clientId)}
                    className={cn(
                      'shrink-0 rounded-lg',
                      client.deleteRequestedAt != null &&
                        'border border-neutral-200',
                    )}
                  >
                    {client.name.charAt(0)}
                  </Avatar>
                </div>
              }
              action={
                <ChevronRightIcon
                  className={cn(
                    'text-basics-secondary-label shrink-0',
                    client.deleteRequestedAt != null &&
                      'text-red-300 dark:text-red-400/80',
                  )}
                />
              }
              className={cn(
                client.deleteRequestedAt != null &&
                  'border-red-300 dark:border-red-900',
              )}
              rightActions={
                client.deleteRequestedAt == null
                  ? [
                      {
                        bg: 'var(--color-red-400)',
                        content: <TrashBinIcon className="text-white" />,
                        onClick: async () => {
                          const result = await overlay.openAsync<boolean>(
                            ({ isOpen, close }) => (
                              <ClientDeleteOverlay
                                isOpen={isOpen}
                                close={close}
                              />
                            ),
                          );

                          if (result) {
                            await onDelete(client);
                            await refetch();
                          }
                        },
                      },
                    ]
                  : undefined
              }
              onClick={() => {
                navigate({
                  to: '/clients/$id',
                  params: { id: client.clientId },
                });
              }}
            >
              <div
                className={cn(
                  'text-title-3 text-basics-primary-label truncate',
                  client.deleteRequestedAt != null &&
                    'text-red-700 dark:text-red-400',
                )}
              >
                <div className="flex items-center gap-1">
                  {client.deleteRequestedAt != null && (
                    <AlertOctagonIcon width={20} height={20} />
                  )}
                  {client.name}
                </div>
              </div>
              <div
                className={cn(
                  'text-label-2 text-basics-secondary-label truncate',
                  client.deleteRequestedAt != null &&
                    'text-red-300 dark:text-red-400/50',
                )}
              >
                ID: {client.clientId}
              </div>
            </SwipeCard>
          ))}
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <img src={puzzleImage} className="size-[100px] opacity-40" />
          <div className="text-body-1 text-basics-secondary-label text-center whitespace-pre-wrap">
            {t('services.list.empty')}
          </div>
        </div>
      )}
    </FunnelLayout>
  );
}
