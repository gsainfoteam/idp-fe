import WithdrawIcon from '@/assets/icons/duo/withdrawal.svg?react';
import CheckIcon from '@/assets/icons/line/check.svg?react';
import ClipboardIcon from '@/assets/icons/line/clipboard.svg?react';
import { Input, Label, PasswordInput } from '@/features/core';

export function InputTestFrame() {
  return (
    <div>
      <h1 className="text-title-1 px-10 pt-10">Input</h1>
      <div className="m-10 flex flex-col gap-5">
        <div className="flex gap-5">
          <Input className="w-[200px]" placeholder="텍스트를 입력하세요" />
          <Input
            className="w-[200px]"
            placeholder="텍스트를 입력하세요"
            required
          />
          <Input
            className="w-[200px]"
            placeholder="텍스트를 입력하세요"
            disabled
          />
          <Input
            className="w-[200px]"
            placeholder="텍스트를 입력하세요"
            error
          />
          <Input
            className="w-[200px]"
            placeholder="텍스트를 입력하세요"
            error="에러 메시지입니다"
          />
        </div>
        <div className="flex gap-5">
          <Input
            className="w-[200px]"
            placeholder="텍스트를 입력하세요"
            prefixIcon={<CheckIcon />}
          />
          <Input
            className="w-[200px]"
            placeholder="텍스트를 입력하세요"
            error
            prefixIcon={
              <WithdrawIcon
                stroke="var(--color-red-800)"
                fill="var(--color-red-200)"
              />
            }
          />
          <Input
            className="w-[200px]"
            placeholder="텍스트를 입력하세요"
            suffixIcon={<ClipboardIcon onClick={() => alert('Copied!')} />}
          />
          <Input
            className="w-[100px]"
            placeholder="체중"
            suffixIcon={<div className="text-label-1">kg</div>}
          />
          <PasswordInput
            className="w-[250px]"
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <div className="flex gap-5">
          <Label text="라벨입니다">
            <Input className="w-[200px]" placeholder="텍스트를 입력하세요" />
          </Label>
          <Label text="라벨입니다" required>
            <Input className="w-[200px]" placeholder="텍스트를 입력하세요" />
          </Label>
          <Label text="라벨입니다" required htmlFor="input">
            <Input
              className="w-[200px]"
              placeholder="텍스트를 입력하세요"
              id="input"
            />
          </Label>
        </div>
      </div>
    </div>
  );
}
