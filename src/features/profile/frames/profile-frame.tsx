import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import CodeIcon from '@/assets/icons/duo/code.svg?react';
import LockIcon from '@/assets/icons/duo/lock.svg?react';
import LogoutIcon from '@/assets/icons/duo/logout.svg?react';
import UserIcon from '@/assets/icons/duo/user.svg?react';
import WithdrawalIcon from '@/assets/icons/duo/withdrawal.svg?react';
import { useAuth } from '@/features/auth';
import { Button, FunnelStep, Thumbnail } from '@/features/core';

export function ProfileFrame() {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();

  // TODO: profile image Thumbnail에 추가하기

  if (!user) return null;
  return (
    <FunnelStep stepTitle={t('profile.title')}>
      <div className="flex flex-col gap-6">
        <div className="flex h-fit w-full items-center gap-3 px-3">
          <Thumbnail name={user.name} />
          <div className="flex flex-col">
            <div className="text-title-3">{user.name}</div>
            <div className="text-body-2 text-neutral-400">{user.email}</div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Link to=".">
            <Button
              variant="primary"
              className="w-full justify-start bg-neutral-50 px-4 py-3 active:bg-neutral-100"
              labelClassName="gap-3 text-neutral-950 text-body-1"
              prefixIcon={
                <UserIcon
                  stroke="var(--color-neutral-700)"
                  fill="var(--color-neutral-200)"
                />
              }
            >
              {t('profile.edit.title')}
            </Button>
          </Link>
          <Link to=".">
            <Button
              variant="primary"
              className="w-full justify-start bg-neutral-50 px-4 py-3 active:bg-neutral-100"
              labelClassName="gap-3 text-neutral-950 text-body-1"
              prefixIcon={
                <LockIcon
                  stroke="var(--color-neutral-700)"
                  fill="var(--color-neutral-200)"
                />
              }
            >
              {t('profile.password.title')}
            </Button>
          </Link>
          <Link to=".">
            <Button
              variant="primary"
              className="w-full justify-start bg-neutral-50 px-4 py-3 active:bg-neutral-100"
              labelClassName="gap-3 text-neutral-950 text-body-1"
              prefixIcon={
                <CodeIcon
                  stroke="var(--color-neutral-700)"
                  fill="var(--color-neutral-200)"
                />
              }
            >
              {t('developer.menuItem')}
            </Button>
          </Link>
          <Button
            variant="primary"
            className="w-full justify-start bg-neutral-50 px-4 py-3 active:bg-neutral-100"
            labelClassName="gap-3 text-neutral-950 text-body-1"
            prefixIcon={
              <LogoutIcon
                stroke="var(--color-neutral-700)"
                fill="var(--color-neutral-200)"
              />
            }
            onClick={signOut}
          >
            {t('profile.logout')}
          </Button>
          <Link to=".">
            <Button
              variant="primary"
              className="w-full justify-start bg-red-50 px-4 py-3 active:bg-red-100"
              labelClassName="gap-3 text-red-900 text-body-1"
              prefixIcon={
                <WithdrawalIcon
                  stroke="var(--color-red-800)"
                  fill="var(--color-red-200)"
                />
              }
            >
              {t('profile.withdrawal')}
            </Button>
          </Link>
        </div>
      </div>
    </FunnelStep>
  );
}
