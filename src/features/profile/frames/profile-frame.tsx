import { Button } from '@/features/core';

export function ProfileFrame() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-[400px] flex-col px-5 py-8">
        <div className="flex flex-col rounded-lg border border-neutral-200 p-2">
          <Button variant="text" className="p-3 text-neutral-950">
            프로필 수정
          </Button>
          <Button variant="text" className="p-3 text-neutral-950">
            비밀번호 변경
          </Button>
          <Button variant="text" className="p-3 text-neutral-950">
            개발자 센터
          </Button>
          <Button variant="text" className="p-3 text-neutral-950">
            로그아웃
          </Button>
        </div>
      </div>
    </div>
  );
}
