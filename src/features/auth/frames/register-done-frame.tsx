import { Link } from '@tanstack/react-router';

import { Button } from '@/features/core';

export function RegisterDoneFrame() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-[400px] flex-col px-5 py-6">
        <div className="text-title-1 mb-4">회원가입</div>
        <div className="text-title-3 text-neutral-900">
          회원가입이 완료되었습니다
        </div>
        <div className="h-100" />
        <Link to="/auth/login">
          <Button variant="primary" type="button">
            로그인하기
          </Button>
        </Link>
      </div>
    </div>
  );
}
