import { useTranslation } from 'react-i18next';

import lockImage from '@/assets/icons/color/lock.png';
import KeyIcon from '@/assets/icons/line/key.svg?react';
import { Avatar, Button, Card, FunnelLayout, uniqueKey } from '@/features/core';
import { Link } from '@tanstack/react-router';

import { usePasskeyList } from '../hooks/use-passkey-list';

export function PasskeyListFrame() {
  const { t } = useTranslation();
  const { passkeys } = usePasskeyList();

  return (
    <FunnelLayout
      title={t('passkey.title')}
      stepTitle={t('passkey.steps.list.title')}
      description={t('passkey.steps.list.description')}
      button={
        <Link to="/passkeys/new">
          <Button variant="primary" className="w-full">
            {t('passkey.steps.list.add')}
          </Button>
        </Link>
      }
    >
      {passkeys?.length ? (
        <div className="flex flex-col gap-3">
          {passkeys.map((passkey) => (
            <Card
              avatar={
                <Avatar
                  size={10}
                  seed={uniqueKey(passkey.id)}
                  className="shrink-0 rounded-lg"
                >
                  <KeyIcon />
                </Avatar>
              }
              title={passkey.name}
              description={`Last used: ${passkey.loginAt}`}
            />
          ))}
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <img src={lockImage} className="size-[100px] opacity-40" />
          <div className="text-body-1 text-basics-secondary-label text-center whitespace-pre-wrap">
            {t('services.list.empty')}
          </div>
        </div>
      )}
    </FunnelLayout>
  );
}
