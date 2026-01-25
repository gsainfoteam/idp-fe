import { useTranslation } from 'react-i18next';

import { Button, Dialog, LogClick, LogDialog } from '@/features/core';

type Member = {
  uuid: string;
  name: string;
};

export function ClientKickOverlay({
  member,
  isOpen,
  close,
}: {
  member: Member;
  isOpen: boolean;
  close: (_: boolean) => void;
}) {
  const { t } = useTranslation();

  return (
    <LogDialog
      isOpen={isOpen}
      close={close}
      defaultCloseValue={false}
      className="mx-10 min-w-75"
      event="kick_confirmation"
      openProperties={{ resource: 'member' }}
      closeProperties={(value) => ({
        resource: 'member',
        result: value ? 'confirm' : 'cancel',
      })}
    >
      <Dialog.Header>
        {t('services.detail.members.kick_overlay.title')}
      </Dialog.Header>
      <Dialog.Body>
        {t('services.detail.members.kick_overlay.description', {
          name: member.name,
        })}
      </Dialog.Body>
      <Dialog.Footer>
        <Dialog.Close closeValue={false} className="grow">
          <Button variant="secondary" className="w-full">
            {t('services.detail.members.kick_overlay.cancel')}
          </Button>
        </Dialog.Close>
        <Dialog.Close closeValue={true} className="grow">
          <LogClick
            event="member_kick_button"
            properties={{ memberId: member.uuid }}
          >
            <Button variant="primary" className="w-full">
              {t('services.detail.members.kick_overlay.confirm')}
            </Button>
          </LogClick>
        </Dialog.Close>
      </Dialog.Footer>
    </LogDialog>
  );
}
