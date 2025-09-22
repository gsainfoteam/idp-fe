import { useTranslation } from 'react-i18next';

import puzzleImage from '@/assets/icons/color/puzzle.png';
import ChevronRightIcon from '@/assets/icons/line/chevron-right.svg?react';
import AlertOctagonIcon from '@/assets/icons/solid/alert-octagon.svg?react';
import { Avatar, Button, FunnelLayout, cn, uniqueKey } from '@/features/core';
import { Link } from '@tanstack/react-router';

import { useClientList } from '../hooks/use-client-list';

export function ClientListFrame() {
  const { t } = useTranslation();
  const { clients } = useClientList();

  // TODO: Error Boundary + Suspense

  return (
    <FunnelLayout
      stepTitle={t('services.list.title')}
      title={t('profile.menu.developer')}
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
            <Link
              key={client.clientId}
              to="/clients/$id"
              params={{ id: client.clientId }}
            >
              <div
                className={cn(
                  'border-basics-tertiary-label flex items-center gap-3 rounded-lg border p-3',
                  client.deleteRequestedAt != null &&
                    'border-red-300 bg-red-50 dark:border-red-800/50 dark:bg-red-900/10',
                )}
              >
                <div
                  className={
                    client.deleteRequestedAt != null
                      ? 'opacity-70 grayscale'
                      : ''
                  }
                >
                  <Avatar
                    size={10}
                    name={client.name}
                    img={client.picture ?? undefined}
                    seed={uniqueKey(client.clientId)}
                    className={cn(
                      'shrink-0 rounded-lg',
                      client.deleteRequestedAt != null &&
                        'border border-neutral-200',
                    )}
                  />
                </div>
                <div className="min-w-0 flex-1">
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
                </div>
                <ChevronRightIcon
                  className={cn(
                    'text-basics-secondary-label shrink-0',
                    client.deleteRequestedAt != null &&
                      'text-red-300 dark:text-red-400/80',
                  )}
                />
              </div>
            </Link>
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
