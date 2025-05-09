import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { RegisterSteps } from '../../frames/register-frame';

import { postVerifyEmail } from '@/data/post-verify-email';
import { DifferenceNonNullable } from '@/features/core';

// TODO: 인증번호 재요청 버튼 + 로직 + 디바운스
// TODO: 인증번호 5번 제한 구현 + 5번 틀리면 맞아도 못들어가게
// TODO: 인증번호 타이머 구현

export const useEmailOverlayForm = ({
  context,
  onNext,
}: {
  context: RegisterSteps['emailOverlay'];
  onNext: (
    data: DifferenceNonNullable<
      RegisterSteps['code'],
      RegisterSteps['emailOverlay']
    >,
  ) => void;
}) => {
  const form = useForm({
    resolver: zodResolver(z.object({})),
  });

  const onSubmit = form.handleSubmit(async () => {
    const { status } = await postVerifyEmail(context);

    if (status) {
      switch (status) {
        case 'SERVER_ERROR':
          console.error('Server error');
          break;
        case 'UNKNOWN_ERROR':
          console.error('Unknown error');
          break;
      }

      return;
    }

    onNext({ emailAgree: true });
  });

  return { form, onSubmit };
};
