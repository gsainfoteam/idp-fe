import { overlay } from 'overlay-kit';
import { useTranslation } from 'react-i18next';

import ChevronRightIcon from '@/assets/icons/line/chevron-right.svg?react';
import AlertOctagonIcon from '@/assets/icons/solid/alert-octagon.svg?react';
import CheckVerifiedIcon from '@/assets/icons/solid/check-verified.svg?react';
import { useAuth } from '@/features/auth';
import { Avatar, FunnelLayout, cn, uniqueKey } from '@/features/core';

import { ProfileEditOverlay } from '../components/profile-edit-overlay';

function formatDateTime(dateString: string) {
  const { i18n } = useTranslation();

  return new Date(dateString).toLocaleString(
    i18n.language === 'ko' ? 'ko-KR' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    },
  );
}

function VerifiedBadge({
  verified,
  onClick,
}: {
  verified: boolean;
  onClick?: () => void;
}) {
  const { t } = useTranslation();

  const Badge = verified ? CheckVerifiedIcon : AlertOctagonIcon;

  return (
    <div
      className={cn(
        'flex items-center gap-1',
        verified ? 'text-[#47B3ED]' : 'text-[#FC9B3A]',
      )}
    >
      <Badge className="size-4" />
      {!verified && (
        <button
          className="text-label-1 text-label ml-1 flex cursor-pointer items-center gap-1 font-bold"
          onClick={onClick}
        >
          {t('profile.verify')}
          <ChevronRightIcon className="text-basics-secondary-label size-4" />
        </button>
      )}
    </div>
  );
}

export function ProfileFrame() {
  const { t } = useTranslation();
  const { user } = useAuth();

  if (!user) return null;

  return (
    <FunnelLayout title={t('profile.title')}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-center gap-4">
          {/* TODO: 프로필 이미지 클릭 시 프로필 수정 */}
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
              {/* TODO: 인증 퍼널 구현 in IDF-141 */}
              <VerifiedBadge verified={true} onClick={() => {}} />
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
              {/* TODO: 인증 퍼널 구현 */}
              <VerifiedBadge verified={false} onClick={() => {}} />
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
              {formatDateTime(user.createdAt)}
            </div>
          </div>
          <div className="text-label-1 flex w-full justify-between">
            <div>{t('profile.sections.detail_info.fields.updated_at')}</div>
            <div className="text-basics-secondary-label">
              {formatDateTime(user.updatedAt)}
            </div>
          </div>
        </div>
      </div>
    </FunnelLayout>
  );
}
