import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { useClientList } from '../hooks/use-client-list';

import puzzleImage from '@/assets/icons/color/puzzle.png';
import ChevronRightIcon from '@/assets/icons/line/chevron-right.svg?react';
import { Avatar, Button, FunnelLayout, uniqueKey } from '@/features/core';

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
              <div className="flex items-center gap-3 rounded-lg border border-neutral-100 p-3">
                <Avatar
                  size={10}
                  name={client.name}
                  img={client.picture ?? undefined}
                  seed={uniqueKey(client.clientId)}
                  className="shrink-0 rounded-lg"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-title-3 truncate text-neutral-900">
                    {client.name}
                  </div>
                  <div className="text-label-2 truncate text-neutral-400">
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
