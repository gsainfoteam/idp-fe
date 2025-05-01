import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import DeveloperIcon from '../icons/developer.svg?react';
import LogoutIcon from '../icons/logout.svg?react';
import PasswordIcon from '../icons/password.svg?react';
import ProfileIcon from '../icons/profile.svg?react';
import WithdrawalIcon from '../icons/withdrawal.svg?react';

import { useAuth } from '@/features/auth';
import { cn } from '@/features/core';

const colorMaps = [
  {
    background: '#FFECB3',
    border: '#FFD54F',
    text: '#5D4037',
  },
  {
    background: '#FFCDD2',
    border: '#E57373',
    text: '#B71C1C',
  },
  {
    background: '#BBDEFB',
    border: '#64B5F6',
    text: '#0D47A1',
  },
  {
    background: '#C8E6C9',
    border: '#81C784',
    text: '#1B5E20',
  },
  {
    background: '#F8BBD0',
    border: '#F06292',
    text: '#880E4F',
  },
  {
    background: '#D1C4E9',
    border: '#9575CD',
    text: '#4A148C',
  },
  {
    background: '#FFCCBC',
    border: '#FF8A65',
    text: '#BF360C',
  },
];

export function ProfileFrame() {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  if (!user) return null;

  const colorMap = colorMaps[user.name.charCodeAt(0) % colorMaps.length];

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-[400px] flex-col gap-6 px-5 py-8">
        <div className="text-title-1 text-pretty whitespace-pre-wrap">
          {t('profile.title')}
        </div>
        <div className="flex items-center gap-3 px-3">
          <div
            className={cn(
              'text-title-1 flex size-16 items-center justify-center rounded-full border select-none',
            )}
            style={{
              background: colorMap?.background,
              borderColor: colorMap?.border,
              color: colorMap?.text,
            }}
          >
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
