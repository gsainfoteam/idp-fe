import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { useClientList } from '../hooks/use-client-list';
import { Avatar, Button, cn, FunnelLayout, uniqueKey } from '@/features/core';

import puzzleImage from '@/assets/icons/color/puzzle.png';
import ChevronRightIcon from '@/assets/icons/line/chevron-right.svg?react';
import AlertOctagonIcon from '@/assets/icons/solid/alert-octagon.svg?react';

// TODO: idf-100 머지되면 red 부분 다크모드 지원하게 semantic color token 사용하기

export function ClientListFrame() {
  const { t } = useTranslation();
  const { clients } = useClientList();

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
                  'flex items-center gap-3 rounded-lg border border-neutral-100 p-3',
                  client.deleteRequestedAt != null &&
                    'border-red-300 bg-red-50',
                )}
              >
                <Avatar
                  size={10}
                  name={client.name}
                  img={client.picture ?? undefined}
                  seed={uniqueKey(client.clientId)}
                  className="shrink-0 rounded-lg"
                />
                <div className="min-w-0 flex-1">
                  <div
                    className={cn(
                      'text-title-3 truncate text-neutral-900',
                      client.deleteRequestedAt != null && 'text-red-700',
                    )}
                  >
                    <div className="flex items-center gap-1">
                      {client.deleteRequestedAt != null && (
                        <AlertOctagonIcon
                          width={20}
                          height={20}
                          className="text-red-700"
                        />
                      )}
                      {client.name}
                    </div>
                  </div>
                  <div
                    className={cn(
                      'text-label-2 truncate text-neutral-400',
                      client.deleteRequestedAt != null && 'text-red-300',
                    )}
                  >
                    ID: {client.clientId}
                  </div>
                </div>
                <ChevronRightIcon className="shrink-0 text-neutral-400" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <img src={puzzleImage} className="size-[100px] opacity-40" />
          <div className="text-body-1 text-center whitespace-pre-wrap text-neutral-600">
            {t('services.list.empty')}
          </div>
        </div>
      )}
    </FunnelLayout>
  );
}
