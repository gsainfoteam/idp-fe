import { useTranslation } from 'react-i18next';

import { Avatar, Button, FunnelLayout, uniqueKey } from '@/features/core';

export function DoneStep({
  onNext,
  context,
}: {
  onNext: () => void;
  context: { name: string; email: string; studentId: string };
}) {
  const { t } = useTranslation();

  return (
    <FunnelLayout
      hideUndo
      title={t('withdraw.title')}
      stepTitle={t('withdraw.done.title')}
      button={
        <Button variant="primary" className="w-full" onClick={onNext}>
          {t('withdraw.done.action')}
        </Button>
      }
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Avatar
          size={32}
          name={context.name}
          seed={uniqueKey(context.studentId.toString())}
        />
        <div className="mt-3 flex flex-col items-center">
          <div className="text-title-1 text-center text-neutral-950">
            {context.name}
          </div>
          <div className="text-body-1 text-center text-neutral-400">
            {context.email}
          </div>
        </div>
      </div>
    </FunnelLayout>
  );
}
