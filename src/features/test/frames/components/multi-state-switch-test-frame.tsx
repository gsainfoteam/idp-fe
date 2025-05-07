import { MultiStateSwitch } from '@/features/core';

export function MultiStateSwitchTestFrame() {
  return (
    <div>
      <h1 className="text-title-1 p-10">Multi-State Switch</h1>
      <div className="flex w-1/3 flex-col gap-5 px-10">
        <MultiStateSwitch labels={['One', 'Two', 'Three']} />
        <MultiStateSwitch labels={['One', 'Two', 'Three']} selected={1} />
      </div>
    </div>
  );
}
