import { useTranslation } from 'react-i18next';

import { FunnelLayout } from '@/features/core';

export function WithdrawFrame() {
  const { t } = useTranslation();
  return (
    <FunnelLayout stepTitle={t('withdraw.title')}>
      <div>WithdrawFrame</div>
    </FunnelLayout>
  );
}
