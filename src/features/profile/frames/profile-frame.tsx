import { Link, useNavigate } from '@tanstack/react-router';
import { overlay } from 'overlay-kit';
import { useTranslation } from 'react-i18next';

import { ProfileEditOverlay } from '../components/profile-edit-overlay';

import EditIcon from '@/assets/icons/solid/edit.svg?react';
import { useAuth } from '@/features/auth';
import {
  Avatar,
  FunnelLayout,
  IconButton,
  LogClick,
  uniqueKey,
  VerifiedBadge,
} from '@/features/core';

function formatDateTime(dateString: string, locale: string) {
  return new Date(dateString).toLocaleString(
    locale === 'ko' ? 'ko-KR' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    },
  );
}

export function ProfileFrame() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const isStudent = user.email.endsWith('@gm.gist.ac.kr');

  return (
    <FunnelLayout
      title={t('profile.title')}
      onUndo={async () => {
        await navigate({
          to: '/',
          viewTransition: { types: ['reload'] },
          search: (prev) => ({ ...prev }),
        });
      }}
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <LogClick event="home_profile_edit_button">
              <Avatar
                img={user.picture ?? undefined}
                seed={uniqueKey(user.studentId)}
                size={24}
                className="cursor-pointer"
                onClick={() => {
                  overlay.open(({ isOpen, close }) => (
                    <ProfileEditOverlay isOpen={isOpen} close={close} />
                  ));
                }}
              >
                {user.name.charAt(0)}
              </Avatar>
            </LogClick>
            <div className="absolute right-0 bottom-0">
              <LogClick event="home_profile_edit_button">
                <IconButton
                  variant="primary"
                  size="none"
                  icon={<EditIcon className="size-4" />}
                  className="border-funnel-background size-8 rounded-full border-3"
                />
              </LogClick>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-title-2 text-label">{user.name}</div>
            <div className="text-body-2 text-basics-secondary-label">
              {user.email}
            </div>
          </div>
        </div>
        <FunnelLayout.Separator />
        <div className="text-label flex flex-col gap-5">
          <div className="text-title-3">
            {t('profile.sections.basic_info.title')}
          </div>
          <div className="text-label-1 flex w-full items-center justify-between">
            <div className="flex items-center gap-1">
              {t('profile.sections.basic_info.fields.name_and_id')}
              {isStudent && (
                <LogClick event="home_profile_student_id_verify_button">
                  <Link
                    to="/profile/verify-student-id"
                    disabled={user.isIdVerified}
                  >
                    <VerifiedBadge verified={user.isIdVerified} />
                  </Link>
                </LogClick>
              )}
            </div>
            <div className="text-basics-secondary-label">{`${user.studentId} ${user.name}`}</div>
          </div>
          <div className="text-label-1 flex w-full items-center justify-between">
            <div className="flex items-center gap-1">
              {t('profile.sections.basic_info.fields.email')}
              <VerifiedBadge verified={true} />
            </div>
            <div className="text-basics-secondary-label">{user.email}</div>
          </div>
          <div className="text-label-1 flex w-full items-center justify-between">
            <div className="flex items-center gap-1">
              {t('profile.sections.basic_info.fields.phone_number')}
              <LogClick event="home_profile_phone_number_verify_button">
                <Link
                  to="/profile/verify-phone-number"
                  disabled={user.isPhoneNumberVerified}
                >
                  <VerifiedBadge verified={user.isPhoneNumberVerified} />
                </Link>
              </LogClick>
            </div>
            <div className="text-basics-secondary-label">
              {user.phoneNumber}
            </div>
          </div>
        </div>
        <FunnelLayout.Separator />
        <div className="text-label flex flex-col gap-5">
          <div className="text-title-3">
            {t('profile.sections.detail_info.title')}
          </div>
          <div className="text-label-1 flex w-full justify-between">
            <div>{t('profile.sections.detail_info.fields.uuid')}</div>
            <div className="text-basics-secondary-label">{user.uuid}</div>
          </div>
          <div className="text-label-1 flex w-full justify-between">
            <div>{t('profile.sections.detail_info.fields.created_at')}</div>
            <div className="text-basics-secondary-label">
              {formatDateTime(user.createdAt, i18n.language)}
            </div>
          </div>
          <div className="text-label-1 flex w-full justify-between">
            <div>{t('profile.sections.detail_info.fields.updated_at')}</div>
            <div className="text-basics-secondary-label">
              {formatDateTime(user.updatedAt, i18n.language)}
            </div>
          </div>
        </div>
      </div>
    </FunnelLayout>
  );
}
