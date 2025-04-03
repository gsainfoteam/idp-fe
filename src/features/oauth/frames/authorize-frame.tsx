import { useState } from 'react';

import { Button, Checkbox } from '@/features/core';

export function AuthorizeFrame() {
  const [checked, setChecked] = useState([false, false, false]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-[400px] flex-col px-5 py-8">
        <div className="text-title-1">
          GIST 메일을 사용하여
          <br />
          '지글' 서비스에
          <br />
          로그인하려고 합니다
        </div>
        <div className="h-8" />
        <div className="text-body-2 text-neutral-800">
          계속하면 아래 정보가 '지글'에 제공됩니다
        </div>
        <div className="h-1" />
        <Checkbox
          checked={checked[0]}
          onChange={() => setChecked([!checked[0], !checked[0], !checked[0]])}
        >
          <div className="font-bold">전체 동의하기</div>
        </Checkbox>
        <div className="h-2.5" />
        <div className="rounded-lg border border-neutral-200 px-5 py-4">
          <div className="text-body-2 mb-1 text-neutral-800">필수</div>
          <div className="flex flex-col gap-1 pl-1">
            <Checkbox disabled checked>
              이메일
            </Checkbox>
            <Checkbox disabled checked>
              이름
            </Checkbox>
          </div>
          <div className="h-2.5" />
          <div className="text-body-2 mb-1 text-neutral-800">선택</div>
          <div className="flex flex-col gap-1 pl-1">
            <Checkbox
              checked={checked[1]}
              onChange={() =>
                setChecked([!checked[1] && checked[2], !checked[1], checked[2]])
              }
            >
              학번
            </Checkbox>
            <Checkbox
              checked={checked[2]}
              onChange={() =>
                setChecked([checked[1] && !checked[2], checked[1], !checked[2]])
              }
            >
              전화번호
            </Checkbox>
          </div>
        </div>
        <div className="h-10" />
        <div className="flex gap-2.5">
          <Button variant="secondary">취소</Button>
          <Button variant="primary">계속하기</Button>
        </div>
      </div>
    </div>
  );
}
