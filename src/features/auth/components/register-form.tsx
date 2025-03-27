import { useFormContext } from 'react-hook-form';

import { RegisterFormSchema } from '../hooks/use-register-form';

import { Input } from './input';

export function RegisterForm() {
  const { register, formState } = useFormContext<RegisterFormSchema>();

  return (
    <div className="flex flex-col">
      <div className="text-title-1 mb-4">회원가입</div>
      <div>
        <div className="text-title-3 mb-2.5">기본정보</div>
        <div className="mb-4">
          <Input
            title="GIST 이메일"
            error={formState.errors.email != null}
            type="email"
            placeholder="m@gm.gist.ac.kr"
            {...register('email')}
          />
        </div>
        <div className="mb-4">
          <Input
            title="비밀번호"
            error={formState.errors.password != null}
            type="password"
            placeholder="비밀번호"
            {...register('password')}
          />
        </div>
        <div>
          <Input
            title="비밀번호 확인"
            error={formState.errors.passwordConfirm != null}
            type="passwordConfirm"
            placeholder="비밀번호 확인"
            {...register('passwordConfirm')}
          />
        </div>
      </div>
      <div className="h-8" />
      <div>
        <div className="text-title-3 mb-2.5">기본정보</div>
        <div className="mb-4">
          <Input
            title="이름"
            error={formState.errors.name != null}
            type="name"
            placeholder="김지니"
            {...register('name')}
          />
        </div>
        <div className="mb-4">
          <Input
            title="학번"
            error={formState.errors.studentId != null}
            type="studentId"
            placeholder="20235000"
            {...register('studentId')}
          />
        </div>
        <div>
          <Input
            title="전화번호"
            error={formState.errors.phoneNumber != null}
            type="phoneNumber"
            placeholder="010-0000-0000"
            {...register('phoneNumber')}
          />
        </div>
      </div>
    </div>
  );
}
