import { FormProvider } from 'react-hook-form';

import { Button } from '../components/button';
import { RegisterForm } from '../components/register-form';
import { useRegisterForm } from '../hooks/use-register-form';

export function RegisterFrame() {
  const { form, onSubmit } = useRegisterForm();

  // 에러가 없으면서 값이 모두 채워질 때 버튼 활성화
  const satisfied =
    Object.keys(form.formState.errors).length === 0 &&
    Object.values(form.getValues()).filter((v) => v.length > 0).length === 6; // FIXME: required input만 체크하기

  // FIXME: 6이라고 하드 코딩해야하나?

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col w-full max-w-[400px] px-5 py-6">
        <FormProvider {...form}>
          <form onSubmit={onSubmit}>
            <RegisterForm />
          </form>
        </FormProvider>
        <div className="h-[77px]" />
        <Button
          variant="primary"
          disabled={!satisfied}
          isLoading={form.formState.isSubmitting}
          onClick={onSubmit}
        >
          다음으로
        </Button>
      </div>
    </div>
  );
}
