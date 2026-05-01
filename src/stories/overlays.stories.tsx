import type { Meta, StoryObj } from '@storybook/react';
import { OverlayProvider, overlay } from 'overlay-kit';

import { RegisterStepUndoWarningOverlay } from '@/features/auth/components/register-step-undo-warning-overlay';
import { Button } from '@/features/core';

const meta = {
  component: Button,
  decorators: [
    (Story) => (
      <OverlayProvider>
        <Story />
      </OverlayProvider>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

function StoryContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-funnel-background flex min-h-64 items-center justify-center p-10">
      {children}
    </div>
  );
}

export const RegisterUndoWarning: Story = {
  args: {
    variant: 'primary' as const,
    children: '회원가입 취소 확인 모달 열기',
  },
  render: (args) => (
    <StoryContainer>
      <Button
        {...args}
        onClick={() => {
          overlay.open(({ isOpen, close }) => (
            <RegisterStepUndoWarningOverlay
              isOpen={isOpen}
              close={(_: boolean) => close()}
            />
          ));
        }}
      />
    </StoryContainer>
  ),
};
