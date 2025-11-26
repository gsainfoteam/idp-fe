import { Link } from '@tanstack/react-router';
import { overlay } from 'overlay-kit';
import { useTranslation } from 'react-i18next';

import { PasskeyDeleteOverlay } from '../components/passkey-delete-overlay';
import { PasskeyEditOverlay } from '../components/passkey-edit-overlay';
import { usePasskeyList } from '../hooks/use-passkey-list';

import lockImage from '@/assets/icons/color/lock.png';
import KeyIcon from '@/assets/icons/line/key.svg?react';
import EditLineIcon from '@/assets/icons/solid/edit-line.svg?react';
import TrashBinIcon from '@/assets/icons/solid/trash-bin.svg?react';
import {
  Avatar,
  Button,
  FunnelLayout,
  LogClick,
  SwipeCard,
  uniqueKey,
} from '@/features/core';

export function PasskeyListFrame() {
  const { t } = useTranslation();
  const { passkeys, refetch } = usePasskeyList();

  return (
    <FunnelLayout
      title={t('passkey.title')}
      stepTitle={t('passkey.steps.list.title')}
      description={t('passkey.steps.list.description')}
      button={
        <Link to="/passkeys/new">
          <LogClick event="passkey_register_button">
            <Button variant="primary" className="w-full">
              {t('passkey.steps.list.add')}
            </Button>
          </LogClick>
        </Link>
      }
    >
      {passkeys?.length ? (
        <div className="flex flex-col gap-3">
          {passkeys.map((passkey) => (
            <SwipeCard
              key={passkey.id}
              avatar={
                <Avatar
                  size={10}
                  seed={uniqueKey(passkey.id)}
                  className="shrink-0 rounded-lg bg-none"
                >
                  {passkey.icon ? (
                    <img
                      src={passkey.icon}
                      alt={passkey.name}
                      className="size-6"
                    />
                  ) : (
                    <KeyIcon />
                  )}
                </Avatar>
              }
              leftActions={[
                {
                  bg: '#FFAC59',
                  content: <EditLineIcon className="text-white" />,
                  onClick: async () => {
                    const result = await overlay.openAsync<boolean>(
                      ({ isOpen, close }) => (
                        <PasskeyEditOverlay
                          passkey={passkey}
                          isOpen={isOpen}
                          close={close}
                        />
                      ),
                    );

                    if (result) {
                      await refetch();
                    }
                  },
                },
              ]}
              rightActions={[
                {
                  bg: 'var(--color-red-400)',
                  content: <TrashBinIcon className="text-white" />,
                  onClick: async () => {
                    const result = await overlay.openAsync<boolean>(
                      ({ isOpen, close }) => (
                        <PasskeyDeleteOverlay
                          passkey={passkey}
                          isOpen={isOpen}
                          close={close}
                        />
                      ),
                    );

                    if (result) {
                      await refetch();
                    }
                  },
                },
              ]}
            >
              <div className="text-title-3 text-basics-primary-label truncate">
                <div className="flex items-center gap-1">{passkey.name}</div>
              </div>
              <div className="text-label-2 text-basics-secondary-label truncate">
                {passkey.loginAt
                  ? t('passkey.steps.list.loginAt', {
                      dt: new Date(passkey.loginAt).toLocaleString(),
                    })
                  : t('passkey.steps.list.createdAt', {
                      dt: new Date(passkey.createdAt).toLocaleString(),
                    })}
              </div>
            </SwipeCard>
          ))}
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <img src={lockImage} className="size-[100px] opacity-40" />
          <div className="text-body-1 text-basics-secondary-label text-center whitespace-pre-wrap">
            {t('passkey.steps.list.empty')}
          </div>
        </div>
      )}
    </FunnelLayout>
  );
}
