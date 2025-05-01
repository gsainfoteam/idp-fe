import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import DeveloperIcon from '../icons/developer.svg?react';
import LogoutIcon from '../icons/logout.svg?react';
import PasswordIcon from '../icons/password.svg?react';
import ProfileIcon from '../icons/profile.svg?react';
import WithdrawalIcon from '../icons/withdrawal.svg?react';

import { useAuth } from '@/features/auth';

export function ProfileFrame() {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  if (!user) throw new Error('User not found');

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-[400px] flex-col gap-6 px-5 py-8">
        <div className="text-title-1 text-pretty whitespace-pre-wrap">
          {t('profile.title')}
        </div>
        <div className="flex items-center gap-3 px-3">
          <div className="text-title-1 flex size-16 items-center justify-center rounded-full border border-neutral-200 bg-neutral-100 select-none">
            {user.name.charAt(0)}
          </div>
          <div className="flex flex-col">
            <div className="text-title-3">{user.name}</div>
            <div className="text-body-2 text-neutral-400">{user.email}</div>
          </div>
        </div>
        <div className="flex flex-col items-stretch gap-3">
          <Link to=".">
            <button className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg bg-neutral-50 px-4 py-3">
              <ProfileIcon />
              <div>{t('profile.edit.title')}</div>
            </button>
          </Link>
          <Link to=".">
            <button className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg bg-neutral-50 px-4 py-3">
              <PasswordIcon />
              <div>{t('profile.password.title')}</div>
            </button>
          </Link>
          <Link to=".">
            <button className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg bg-neutral-50 px-4 py-3">
              <DeveloperIcon />
              <div>{t('developer.menuItem')}</div>
            </button>
          </Link>
          <button
            className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg bg-neutral-50 px-4 py-3"
            onClick={signOut}
          >
            <LogoutIcon />
            <div>{t('profile.logout')}</div>
          </button>
          <Link to=".">
            <button className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg bg-red-50 px-4 py-3">
              <WithdrawalIcon />
              <div className="text-red-900">{t('profile.withdrawal')}</div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
