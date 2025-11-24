import type { Meta, StoryObj } from '@storybook/react';
import { OverlayProvider, overlay } from 'overlay-kit';

import { Button, Dialog } from '@/features/core';

const meta = {
  component: Button,
  argTypes: {},
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

const storyArgs = {
  variant: 'primary' as const,
};

export const ZeroCTA: Story = {
  args: {
    ...storyArgs,
    children: 'Open Dialog (0 CTA)',
  },
  render: (args) => (
    <StoryContainer>
      <Button
        {...args}
        onClick={() => {
          overlay.open(({ isOpen, close }) => (
            <Dialog
              isOpen={isOpen}
              close={close}
              defaultCloseValue={undefined as never}
            >
              <Dialog.Header>Body Only Dialog</Dialog.Header>
              <Dialog.Body>
                This dialog has no CTA buttons. Close via backdrop or ESC.
              </Dialog.Body>
            </Dialog>
          ));
        }}
      />
    </StoryContainer>
  ),
};

export const OneCTA: Story = {
  args: {
    ...storyArgs,
    children: 'Open Dialog (1 CTA)',
  },
  render: (args) => (
    <StoryContainer>
      <Button
        {...args}
        onClick={() => {
          overlay.open(({ isOpen, close }) => (
            <Dialog
              isOpen={isOpen}
              close={close}
              defaultCloseValue={undefined as never}
            >
              <Dialog.Header>Single CTA Dialog</Dialog.Header>
              <Dialog.Body>
                This dialog has a single confirm button.
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.Close className="w-full">
                  <Button
                    variant="primary"
                    onClick={() => alert('Confirmed!')}
                    className="w-full"
                  >
                    Confirm
                  </Button>
                </Dialog.Close>
              </Dialog.Footer>
            </Dialog>
          ));
        }}
      />
    </StoryContainer>
  ),
};

export const TwoCTA: Story = {
  args: {
    ...storyArgs,
    children: 'Open Dialog (2 CTA)',
  },
  render: (args) => (
    <StoryContainer>
      <Button
        {...args}
        onClick={() => {
          overlay.open(({ isOpen, close }) => (
            <Dialog
              isOpen={isOpen}
              close={close}
              defaultCloseValue={undefined as never}
            >
              <Dialog.Header>Two CTA Dialog</Dialog.Header>
              <Dialog.Body>
                This dialog has cancel and confirm buttons.
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.Close className="grow">
                  <Button variant="secondary" className="w-full">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Dialog.Close className="grow">
                  <Button
                    variant="primary"
                    onClick={() => alert('Confirmed!')}
                    className="w-full"
                  >
                    Confirm
                  </Button>
                </Dialog.Close>
              </Dialog.Footer>
            </Dialog>
          ));
        }}
      />
    </StoryContainer>
  ),
};

export const ThreeCTA: Story = {
  args: {
    ...storyArgs,
    children: 'Open Dialog (3 CTA)',
  },
  render: (args) => (
    <StoryContainer>
      <Button
        {...args}
        onClick={() => {
          overlay.open(({ isOpen, close }) => (
            <Dialog
              isOpen={isOpen}
              close={close}
              defaultCloseValue={undefined as never}
            >
              <Dialog.Header>Three CTA Dialog</Dialog.Header>
              <Dialog.Body>
                This dialog has cancel, maybe, and confirm buttons.
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.Close className="grow">
                  <Button variant="secondary" className="w-full">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Dialog.Close className="grow">
                  <Button variant="secondary" className="w-full">
                    Maybe
                  </Button>
                </Dialog.Close>
                <Dialog.Close className="grow">
                  <Button
                    variant="primary"
                    onClick={() => alert('Confirmed!')}
                    className="w-full"
                  >
                    Confirm
                  </Button>
                </Dialog.Close>
              </Dialog.Footer>
            </Dialog>
          ));
        }}
      />
    </StoryContainer>
  ),
};

export const NoBody: Story = {
  args: {
    ...storyArgs,
    children: 'Open Dialog (No Body)',
  },
  render: (args) => (
    <StoryContainer>
      <Button
        {...args}
        onClick={() => {
          overlay.open(({ isOpen, close }) => (
            <Dialog
              isOpen={isOpen}
              close={close}
              defaultCloseValue={undefined as never}
            >
              <Dialog.Header>No Body Dialog</Dialog.Header>
              <Dialog.Footer>
                <Dialog.Close className="flex justify-end">
                  <Button variant="text">Close</Button>
                </Dialog.Close>
              </Dialog.Footer>
            </Dialog>
          ));
        }}
      />
    </StoryContainer>
  ),
};

export const AsyncDialog: Story = {
  args: {
    ...storyArgs,
    children: 'Open Dialog (Async)',
  },
  render: (args) => (
    <StoryContainer>
      <Button
        {...args}
        onClick={async () => {
          const result = await overlay.openAsync<boolean>(
            ({ isOpen, close }) => (
              <Dialog isOpen={isOpen} close={close} defaultCloseValue={false}>
                <Dialog.Header>Async Dialog</Dialog.Header>
                <Dialog.Body>
                  Clicking confirm returns true, cancel returns false.
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.Close closeValue={false} className="grow">
                    <Button variant="secondary" className="w-full">
                      Cancel
                    </Button>
                  </Dialog.Close>
                  <Dialog.Close closeValue={true} className="grow">
                    <Button variant="primary" className="w-full">
                      Confirm
                    </Button>
                  </Dialog.Close>
                </Dialog.Footer>
              </Dialog>
            ),
          );
          alert(`Result: ${result}`);
        }}
      />
    </StoryContainer>
  ),
};
