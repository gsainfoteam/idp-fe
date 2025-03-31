import { useFormContext } from 'react-hook-form';

import { RegisterFormSchema } from '../hooks/use-register-form';

import { Input } from './input';

export function RegisterForm() {
  const { register, formState } = useFormContext<RegisterFormSchema>();

  // FIXME: password, passwordConfirm이 다르면 오류 나게 해놨는데 왜 formState.errors에서 안 잡히는지?
  // TODO: language file
  // TODO: 다크모드
  // FIXME: 기본 정보 제목이 2개

  return (
    <div className="flex flex-col">
      <div className="text-title-1 mb-4">회원가입</div>
      <div>
        <div className="text-title-3 mb-2.5">기본정보</div>
        <div className="mb-4">
          <Input
            label="GIST 이메일"
            error={formState.errors.email?.message}
            type="email"
            placeholder="m@gm.gist.ac.kr"
            required
            {...register('email')}
          />
        </div>
        <div className="mb-4">
          <Input
            label="비밀번호"
            error={formState.errors.password?.message}
            type="password"
            placeholder="비밀번호"
            required
            {...register('password')}
          />
        </div>
        <div>
          <Input
            label="비밀번호 확인"
            error={formState.errors.passwordConfirm?.message}
            type="password"
            placeholder="비밀번호 확인"
            required
            {...register('passwordConfirm')}
          />
        </div>
      </div>
      <div className="h-8" />
      <div>
        <div className="text-title-3 mb-2.5">기본정보</div>
        <div className="mb-4">
          <Input
            label="이름"
            error={formState.errors.name?.message}
            type="text"
            placeholder="김지니"
            required
            {...register('name')}
          />
        </div>
        <div className="mb-4">
          <Input
            label="학번"
            error={formState.errors.studentId?.message}
            type="number"
            placeholder="20235000"
            required
            {...register('studentId')}
          />
        </div>
        <div>
          <Input
            label="전화번호"
            error={formState.errors.phoneNumber?.message}
            type="tel"
            placeholder="010-0000-0000"
            {...register('phoneNumber')}
          />
        </div>
      </div>
    </div>
  );
}
