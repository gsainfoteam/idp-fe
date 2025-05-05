import { Switch } from '@/features/core';

export function SwitchTestFrame() {
  return (
    <div>
      <h1 className="text-title-1 p-10">Switch</h1>
      <div className="flex flex-col gap-5 px-10">
        <Switch />
        <Switch defaultChecked />
        <Switch disabled />
        <Switch defaultChecked disabled />
      </div>
    </div>
  );
}
