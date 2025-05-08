import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { RegisterSteps } from '../../frames/register-frame';

import { postVerifyEmail } from '@/data/post-verify-email';

// TODO: undo alert modal test
// TODO: 뒤로가기 누를 때 오버레이 스텝 무시하기
// TODO: 인증번호 재요청 버튼 + 로직 + 디바운스
// TODO: 인증번호 5번 제한 구현 + 5번 틀리면 맞아도 못들어가게
// TODO: 인증번호 타이머 구현
// TODO: 회원가입 완료 시 아바타 + 아바타 컴포넌트 내의 텍스트를 디자인 시스템의 타이포그래피 사용하지 말고 size prop를 사용하여 만들기
// TODO: 모달에서 취소 버튼은 괜찮은데, X 버튼이 이상함

export const useEmailOverlayForm = ({
  context,
  onNext,
}: {
  context: RegisterSteps['emailOverlay'];
  onNext: () => void;
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

    onNext();
  });

  return { form, onSubmit };
};
