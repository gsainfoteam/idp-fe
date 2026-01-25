import { useTranslation } from 'react-i18next';

import { cn } from '../../utils/cn';

import ChevronRightIcon from '@/assets/icons/line/chevron-right.svg?react';
import AlertOctagonIcon from '@/assets/icons/solid/alert-octagon.svg?react';
import CheckVerifiedIcon from '@/assets/icons/solid/check-verified.svg?react';

export interface VerifiedBadgeProps {
  verified: boolean;
}

export function VerifiedBadge({ verified }: VerifiedBadgeProps) {
  const { t } = useTranslation();

  const Badge = verified ? CheckVerifiedIcon : AlertOctagonIcon;

  return (
    <div
      className={cn(
        'flex items-center gap-1',
        verified
          ? 'text-verified-badge-background-verified'
          : 'text-verified-badge-background-unverified',
      )}
    >
      <Badge className="size-4" />
      {!verified && (
        <div className="text-label-1 text-label ml-1 flex items-center gap-1 font-bold">
          {t('profile.verify')}
          <ChevronRightIcon className="text-basics-secondary-label size-4" />
        </div>
      )}
    </div>
  );
}
