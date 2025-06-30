import { Link } from '@tanstack/react-router';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import CodeIcon from '@/assets/icons/duo/code.svg?react';
import LockIcon from '@/assets/icons/duo/lock.svg?react';
import LogoutIcon from '@/assets/icons/duo/logout.svg?react';
import UserIcon from '@/assets/icons/duo/user.svg?react';
import WithdrawalIcon from '@/assets/icons/duo/withdrawal.svg?react';
import { useAuth } from '@/features/auth';
import { ProfileEditOverlay } from '../components/profile-edit-overlay';
import {
  Button,
  FunnelLayout,
  Avatar,
  uniqueKey,
  ThemeSwitcher,
} from '@/features/core';
import { overlay } from 'overlay-kit';

interface MenuButtonProps {
  icon: ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'danger';
  children: ReactNode;
}

function MenuButton({
  icon,
  onClick,
  variant = 'default',
  children,
}: MenuButtonProps) {
  return (
    <Button
      variant="primary"
      className={`w-full justify-start px-4 py-3 ${
        variant === 'default'
          ? 'bg-neutral-50 active:bg-neutral-100'
          : 'bg-red-50 active:bg-red-100'
      }`}
      labelClassName={`gap-3 text-body-1 ${
        variant === 'default' ? 'text-neutral-950' : 'text-red-900'
      }`}
      prefixIcon={icon}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export function ProfileFrame() {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <FunnelLayout
      stepTitle={
        <div className="flex items-center justify-between">
          {t('profile.title')}
          <ThemeSwitcher />
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        <div className="flex h-fit w-full items-center gap-3 px-3">
          <Avatar
            name={user.name}
            img={user.picture ?? undefined}
            seed={uniqueKey(user.studentId)}
            className="cursor-pointer"
            onClick={() => {
              overlay.open(({ isOpen, close }) => (
                <ProfileEditOverlay isOpen={isOpen} close={close} />
              ));
            }}
          />
          <div className="flex flex-col">
            <div className="text-title-3">{user.name}</div>
            <div className="text-body-2 text-neutral-400">{user.email}</div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <MenuButton
            icon={
              <UserIcon
                stroke="var(--color-neutral-700)"
                fill="var(--color-neutral-200)"
              />
            }
            onClick={() => {
              overlay.open(({ isOpen, close }) => (
                <ProfileEditOverlay isOpen={isOpen} close={close} />
              ));
            }}
          >
            {t('profile.menu.edit')}
          </MenuButton>
          <Link to="/change-password" search={(prev) => ({ ...prev })}>
            <MenuButton
              icon={
                <LockIcon
                  stroke="var(--color-neutral-700)"
                  fill="var(--color-neutral-200)"
                />
              }
            >
              {t('profile.menu.password')}
            </MenuButton>
          </Link>
          <Link to="/clients">
            <MenuButton
              icon={
                <CodeIcon
                  stroke="var(--color-neutral-700)"
                  fill="var(--color-neutral-200)"
                />
              }
            >
              {t('profile.menu.developer')}
            </MenuButton>
          </Link>
          <MenuButton
            icon={
              <LogoutIcon
                stroke="var(--color-neutral-700)"
                fill="var(--color-neutral-200)"
              />
            }
            onClick={signOut}
          >
            {t('profile.menu.logout')}
          </MenuButton>
          <Link to="/withdraw">
            <MenuButton
              variant="danger"
              icon={
                <WithdrawalIcon
                  stroke="var(--color-red-800)"
                  fill="var(--color-red-200)"
                />
              }
            >
              {t('profile.menu.withdrawal')}
            </MenuButton>
          </Link>
        </div>
      </div>
    </FunnelLayout>
  );
}
