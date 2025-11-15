import { ReactNode } from 'react';

import { Link } from '@tanstack/react-router';
import { overlay } from 'overlay-kit';
import { useTranslation } from 'react-i18next';

import CodeIcon from '@/assets/icons/duo/code.svg?react';
import LockIcon from '@/assets/icons/duo/lock.svg?react';
import LogoutIcon from '@/assets/icons/duo/logout.svg?react';
import PasskeyIcon from '@/assets/icons/duo/passkey.svg?react';
import UserIcon from '@/assets/icons/duo/user.svg?react';
import WithdrawalIcon from '@/assets/icons/duo/withdrawal.svg?react';
import ChevronRightIcon from '@/assets/icons/line/chevron-right.svg?react';
import { useAuth } from '@/features/auth';
import {
  Avatar,
  Button,
  FunnelLayout,
  ThemeSwitcher,
  cn,
  uniqueKey,
} from '@/features/core';

import { ProfileEditOverlay } from '../../profile/components/profile-edit-overlay';

interface MenuButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  variant?: 'default' | 'danger';
  children: ReactNode;
}

function MenuButton({
  icon: Icon,
  onClick,
  variant = 'default',
  children,
}: MenuButtonProps) {
  return (
    <Button
      variant="primary"
      className={cn(
        'w-full justify-start px-4 py-3',
        variant === 'default'
          ? 'hover:bg-neutral-75 dark:hover:bg-neutral-920 dark:bg-neutral-940 bg-neutral-50 active:bg-neutral-100 dark:active:bg-neutral-900'
          : 'bg-warning-50 dark:hover:bg-neutral-920 dark:bg-neutral-940 hover:bg-warning-75 active:bg-warning-100 dark:active:bg-neutral-900',
      )}
      labelClassName={cn(
        'text-body-1 gap-3',
        variant === 'default'
          ? 'text-neutral-950 dark:text-neutral-50'
          : 'text-warning-900 dark:text-warning-300',
      )}
      prefixIcon={
        <Icon
          className={
            variant === 'default'
              ? 'fill-neutral-200 stroke-neutral-700 dark:fill-neutral-800 dark:stroke-neutral-300'
              : 'fill-red-200 stroke-red-800 dark:fill-red-800 dark:stroke-red-200'
          }
        />
      }
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export function HomeFrame() {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <FunnelLayout
      stepTitle={
        <div className="flex items-center justify-between">
          {t('home.title')}
          <ThemeSwitcher />
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        <div className="flex w-full flex-1 items-center px-3">
          <div className="flex w-full items-center gap-3">
            <Avatar
              img={user.picture ?? undefined}
              seed={uniqueKey(user.studentId)}
              className="cursor-pointer"
              onClick={() => {
                overlay.open(({ isOpen, close }) => (
                  <ProfileEditOverlay isOpen={isOpen} close={close} />
                ));
              }}
            >
              {user.name.charAt(0)}
            </Avatar>
            <div className="flex flex-col">
              <div className="text-title-3 text-label">{user.name}</div>
              <div className="text-body-2 text-basics-secondary-label">
                {user.email}
              </div>
            </div>
          </div>
          <Link
            to="/profile"
            className="flex cursor-pointer items-center self-stretch px-2"
          >
            <ChevronRightIcon className="text-basics-secondary-label shrink-0" />
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          <MenuButton
            icon={UserIcon}
            onClick={() => {
              overlay.open(({ isOpen, close }) => (
                <ProfileEditOverlay isOpen={isOpen} close={close} />
              ));
            }}
          >
            {t('home.menu.edit')}
          </MenuButton>
          <Link to="/change-password" search={(prev) => ({ ...prev })}>
            <MenuButton icon={LockIcon}>{t('home.menu.password')}</MenuButton>
          </Link>
          <Link to="/passkeys" search={(prev) => ({ ...prev })}>
            <MenuButton icon={PasskeyIcon}>{t('home.menu.passkey')}</MenuButton>
          </Link>
          <Link to="/clients">
            <MenuButton icon={CodeIcon}>{t('home.menu.developer')}</MenuButton>
          </Link>
          <MenuButton
            icon={LogoutIcon}
            onClick={async () => await signOut(false)}
          >
            {t('home.menu.logout')}
          </MenuButton>
          <Link to="/withdraw">
            <MenuButton variant="danger" icon={WithdrawalIcon}>
              {t('home.menu.withdrawal')}
            </MenuButton>
          </Link>
        </div>
      </div>
    </FunnelLayout>
  );
}
