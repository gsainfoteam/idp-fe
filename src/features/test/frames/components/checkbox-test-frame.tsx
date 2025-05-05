import { Checkbox } from '@/features/core';

export function CheckboxTestFrame() {
  return (
    <div>
      <h1 className="text-title-1 p-10">Checkbox</h1>
      <div className="flex flex-col gap-5 px-10">
        <Checkbox>체크박스</Checkbox>
        <Checkbox defaultChecked>체크박스</Checkbox>
        <Checkbox disabled>체크박스</Checkbox>
        <Checkbox defaultChecked disabled>
          체크박스
        </Checkbox>
      </div>
    </div>
  );
}
