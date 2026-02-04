import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';

import { Label, TelInput } from '@/features/core';

const meta = {
  component: TelInput,
} satisfies Meta<typeof TelInput>;

export default meta;

type Story = StoryObj<typeof meta>;

type FormValues = {
  phoneNumber: string;
};

function TelInputDefault() {
  const { control } = useForm<FormValues>({
    defaultValues: { phoneNumber: '' },
  });
  return (
    <Label text="전화번호">
      <TelInput<FormValues>
        name="phoneNumber"
        control={control}
        placeholder="전화번호를 입력하세요"
      />
    </Label>
  );
}

export const Default: Story = {
  args: {} as never,
  render: () => <TelInputDefault />,
};

function TelInputWithDefaultCountry() {
  const { control } = useForm<FormValues>({
    defaultValues: { phoneNumber: '' },
  });
  return (
    <Label text="전화번호">
      <TelInput<FormValues>
        name="phoneNumber"
        control={control}
        placeholder="전화번호를 입력하세요"
        defaultCountry="KR"
      />
    </Label>
  );
}

export const WithDefaultCountry: Story = {
  args: {} as never,
  render: () => <TelInputWithDefaultCountry />,
};

function TelInputWithValue() {
  const { control } = useForm<FormValues>({
    defaultValues: { phoneNumber: '+821012345678' },
  });
  return (
    <Label text="전화번호">
      <TelInput<FormValues>
        name="phoneNumber"
        control={control}
        placeholder="전화번호를 입력하세요"
        defaultCountry="KR"
      />
    </Label>
  );
}

export const WithValue: Story = {
  args: {} as never,
  render: () => <TelInputWithValue />,
};

function TelInputWithError() {
  const { control } = useForm<FormValues>({
    defaultValues: { phoneNumber: '' },
  });
  return (
    <Label text="전화번호">
      <TelInput<FormValues>
        name="phoneNumber"
        control={control}
        placeholder="전화번호를 입력하세요"
        error="올바른 전화번호를 입력해주세요"
        defaultCountry="KR"
      />
    </Label>
  );
}

export const WithError: Story = {
  args: {} as never,
  render: () => <TelInputWithError />,
};

function TelInputDisabled() {
  const { control } = useForm<FormValues>({
    defaultValues: { phoneNumber: '+821012345678' },
  });
  return (
    <Label text="전화번호">
      <TelInput<FormValues>
        name="phoneNumber"
        control={control}
        placeholder="전화번호를 입력하세요"
        disabled
        defaultCountry="KR"
      />
    </Label>
  );
}

export const Disabled: Story = {
  args: {} as never,
  render: () => <TelInputDisabled />,
};

type FormValuesMultiple = {
  phoneNumber: string;
};

function TelInputWithForm() {
  const { control, formState, watch } = useForm<FormValuesMultiple>({
    defaultValues: {
      phoneNumber: '',
    },
  });

  const phoneNumber = watch('phoneNumber');

  return (
    <div className="flex flex-col gap-5 p-10">
      <Label text="전화번호">
        <TelInput<FormValuesMultiple>
          name="phoneNumber"
          control={control}
          placeholder="전화번호를 입력하세요"
          defaultCountry="KR"
          error={formState.errors.phoneNumber?.message}
        />
      </Label>
      <div className="text-body-1 text-input-default-label">
        value: {phoneNumber || '(없음)'}
      </div>
    </div>
  );
}

export const WithReactHookForm: Story = {
  args: {} as never,
  render: () => <TelInputWithForm />,
};

type TestFormValues = {
  korea: string;
  usa: string;
  japan: string;
  errorDemo: string;
  disabledDemo: string;
};

function TelInputTestFrame() {
  const { control } = useForm<TestFormValues>({
    defaultValues: {
      korea: '',
      usa: '',
      japan: '',
      errorDemo: '',
      disabledDemo: '+821012345678',
    },
  });

  return (
    <div className="bg-funnel-background absolute inset-0">
      <div className="m-10 flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <Label text="한국 (기본값)">
            <TelInput<TestFormValues>
              name="korea"
              control={control}
              placeholder="전화번호를 입력하세요"
              defaultCountry="KR"
            />
          </Label>
          <Label text="미국">
            <TelInput<TestFormValues>
              name="usa"
              control={control}
              placeholder="Enter phone number"
              defaultCountry="US"
            />
          </Label>
          <Label text="일본">
            <TelInput<TestFormValues>
              name="japan"
              control={control}
              placeholder="電話番号を入力してください"
              defaultCountry="JP"
            />
          </Label>
        </div>
        <div className="flex flex-col gap-3">
          <Label text="에러 상태">
            <TelInput<TestFormValues>
              name="errorDemo"
              control={control}
              placeholder="전화번호를 입력하세요"
              error="올바른 전화번호를 입력해주세요"
              defaultCountry="KR"
            />
          </Label>
          <Label text="비활성화">
            <TelInput<TestFormValues>
              name="disabledDemo"
              control={control}
              placeholder="전화번호를 입력하세요"
              disabled
              defaultCountry="KR"
            />
          </Label>
        </div>
      </div>
    </div>
  );
}

export const TelInputTest: Story = {
  args: {} as never,
  render: () => <TelInputTestFrame />,
};
