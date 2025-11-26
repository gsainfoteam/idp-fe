import { useTranslation } from 'react-i18next';

import { Button, LogClick, LogDialog } from '@/features/core';

type StudentIdVerificationDialogProps = {
  isOpen: boolean;
  close: () => void;
  defaultCloseValue: boolean;
  studentId: string;
  onConfirm: () => void | Promise<void>;
};

export function StudentIdVerificationDialog({
  isOpen,
  close,
  defaultCloseValue,
  studentId,
  onConfirm,
}: StudentIdVerificationDialogProps) {
  const { t } = useTranslation();

  return (
    <LogDialog
      isOpen={isOpen}
      close={(_: boolean) => close()}
      defaultCloseValue={defaultCloseValue}
      className="mx-10 min-w-[300px]"
      event="student_id_dialog"
      closeProperties={(value) => ({ result: value ? 'confirm' : 'cancel' })}
    >
      <Dialog.Header className="flex flex-col gap-1">
        <div className="text-title-1">
          {t('student_id_verification_dialog.title')}
        </div>
        <div className="text-body-1">
          {t('student_id_verification_dialog.description')}
        </div>
      </Dialog.Header>
      <Dialog.Body>
        <div className="text-title-1 text-label w-full text-center">
          {studentId}
        </div>
      </Dialog.Body>
      <Dialog.Footer>
        <Dialog.Close className="grow" closeValue={false}>
          <LogClick event="student_id_verification_dialog_cancel">
            <Button variant="secondary" className="w-full">
              {t('student_id_verification_dialog.buttons.cancel')}
            </Button>
          </LogClick>
        </Dialog.Close>
        <Dialog.Close className="grow" closeValue={true}>
          <LogClick
            event="student_id_verification_dialog_confirm"
            properties={{ studentId }}
          >
            <Button variant="primary" className="w-full" onClick={onConfirm}>
              {t('student_id_verification_dialog.buttons.continue')}
            </Button>
          </LogClick>
        </Dialog.Close>
      </Dialog.Footer>
    </LogDialog>
  );
}
