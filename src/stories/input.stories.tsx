import type { Meta, StoryObj } from '@storybook/react';

import { useEffect, useState } from 'react';

import WithdrawIcon from '@/assets/icons/duo/withdrawal.svg?react';
import {
  PasswordInput,
  Label,
  timeString,
  Input,
  CopyInput,
} from '@/features/core';

import AddIcon from '@/assets/icons/line/add.svg?react';
import ChevronRightIcon from '@/assets/icons/line/chevron-right.svg?react';

const meta = {
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    error: false,
    disabled: false,
    placeholder: 'm@gm.gist.ac.kr',
  },
};

export const Error: Story = {
  args: {
    error: 'Error Message',
    disabled: false,
    placeholder: 'm@gm.gist.ac.kr',
  },
};

export const Disabled: Story = {
  args: {
    error: false,
    disabled: true,
    placeholder: 'm@gm.gist.ac.kr',
  },
};

export function InputTestFrame() {
  const [remainTime, setRemainTime] = useState(30);

  useEffect(() => {
    if (remainTime <= 0) return;

    const interval = setTimeout(() => {
      setRemainTime((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(interval);
  }, [remainTime]);

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
            prefixAdornment={<AddIcon />}
          />
          <Input
            className="w-[200px]"
            placeholder="텍스트 입력"
            prefixAdornment={<ChevronRightIcon />}
            error
          />
          <Input
            className="w-[200px]"
            placeholder="텍스트를 입력하세요"
            error
            prefixAdornment={
              <WithdrawIcon
                stroke="var(--color-red-800)"
                fill="var(--color-red-200)"
              />
            }
          />
          <CopyInput
            className="w-[250px]"
            placeholder="텍스트를 입력하세요"
            value="asdf"
            success="Copied!"
          />
          <Input
            className="w-[100px]"
            placeholder="체중"
            suffixAdornment={<div className="text-label-1">kg</div>}
          />
          <CopyInput
            className="w-[200px]"
            placeholder="텍스트를 입력하세요"
            value="1234567890"
            success="Copied!"
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
          <Label text="라벨입니다" required>
            <Input className="w-[200px]" placeholder="텍스트를 입력하세요" />
          </Label>
        </div>
      </div>
      <div className="m-10 flex flex-col gap-5">
        <Input
          className="w-[200px]"
          placeholder="텍스트를 입력하세요"
          required
          suffixAdornment={
            <div className="text-label-1 text-neutral-600">
              {timeString(remainTime)}
            </div>
          }
        />
      </div>
    </div>
  );
}

export const InputTest: Story = {
  render: () => <InputTestFrame />,
};
