import type { Meta, StoryObj } from '@storybook/react';
import { OverlayProvider, overlay } from 'overlay-kit';

import { BottomSheet, Button } from '@/features/core';

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
    children: 'Open Bottom Sheet (0 CTA)',
  },
  render: (args) => (
    <StoryContainer>
      <Button
        {...args}
        onClick={() => {
          overlay.open(({ isOpen, close }) => (
            <BottomSheet
              isOpen={isOpen}
              close={(_: boolean) => close()}
              defaultCloseValue={false}
            >
              <BottomSheet.Header>Body Only Bottom Sheet</BottomSheet.Header>
              <BottomSheet.Body>
                No CTA buttons. Close via drag, backdrop, or ESC.
              </BottomSheet.Body>
            </BottomSheet>
          ));
        }}
      />
    </StoryContainer>
  ),
};

export const OneCTA: Story = {
  args: {
    ...storyArgs,
    children: 'Open Bottom Sheet (1 CTA)',
  },
  render: (args) => (
    <StoryContainer>
      <Button
        {...args}
        onClick={() => {
          overlay.open(({ isOpen, close }) => (
            <BottomSheet
              isOpen={isOpen}
              close={(_: boolean) => close()}
              defaultCloseValue={false}
            >
              <BottomSheet.Header>Single CTA Bottom Sheet</BottomSheet.Header>
              <BottomSheet.Body>
                This bottom sheet has a confirm button.
              </BottomSheet.Body>
              <BottomSheet.Footer>
                <BottomSheet.Close className="w-full" closeValue={true}>
                  <Button
                    variant="primary"
                    onClick={() => alert('Confirmed!')}
                    className="w-full"
                  >
                    Confirm
                  </Button>
                </BottomSheet.Close>
              </BottomSheet.Footer>
            </BottomSheet>
          ));
        }}
      />
    </StoryContainer>
  ),
};

export const TwoCTA: Story = {
  args: {
    ...storyArgs,
    children: 'Open Bottom Sheet (2 CTA)',
  },
  render: (args) => (
    <StoryContainer>
      <Button
        {...args}
        onClick={() => {
          overlay.open(({ isOpen, close }) => (
            <BottomSheet
              isOpen={isOpen}
              close={(_: boolean) => close()}
              defaultCloseValue={false}
            >
              <BottomSheet.Header>Two CTA Bottom Sheet</BottomSheet.Header>
              <BottomSheet.Body>
                This bottom sheet has cancel and confirm buttons.
              </BottomSheet.Body>
              <BottomSheet.Footer>
                <BottomSheet.Close className="grow" closeValue={false}>
                  <Button variant="secondary" className="w-full">
                    Cancel
                  </Button>
                </BottomSheet.Close>
                <BottomSheet.Close className="grow" closeValue={true}>
                  <Button
                    variant="primary"
                    onClick={() => alert('Confirmed!')}
                    className="w-full"
                  >
                    Confirm
                  </Button>
                </BottomSheet.Close>
              </BottomSheet.Footer>
            </BottomSheet>
          ));
        }}
      />
    </StoryContainer>
  ),
};

export const ThreeCTA: Story = {
  args: {
    ...storyArgs,
    children: 'Open Bottom Sheet (3 CTA)',
  },
  render: (args) => (
    <StoryContainer>
      <Button
        {...args}
        onClick={() => {
          overlay.open(({ isOpen, close }) => (
            <BottomSheet
              isOpen={isOpen}
              close={(_: boolean) => close()}
              defaultCloseValue={false}
            >
              <BottomSheet.Header>Three CTA Bottom Sheet</BottomSheet.Header>
              <BottomSheet.Body>
                This bottom sheet has cancel, maybe, and confirm buttons.
              </BottomSheet.Body>
              <BottomSheet.Footer>
                <BottomSheet.Close className="grow" closeValue={false}>
                  <Button variant="secondary" className="w-full">
                    Cancel
                  </Button>
                </BottomSheet.Close>
                <BottomSheet.Close className="grow" closeValue={false}>
                  <Button variant="secondary" className="w-full">
                    Maybe
                  </Button>
                </BottomSheet.Close>
                <BottomSheet.Close className="grow" closeValue={true}>
                  <Button
                    variant="primary"
                    onClick={() => alert('Confirmed!')}
                    className="w-full"
                  >
                    Confirm
                  </Button>
                </BottomSheet.Close>
              </BottomSheet.Footer>
            </BottomSheet>
          ));
        }}
      />
    </StoryContainer>
  ),
};

export const NoBody: Story = {
  args: {
    ...storyArgs,
    children: 'Open Bottom Sheet (No Body)',
  },
  render: (args) => (
    <StoryContainer>
      <Button
        {...args}
        onClick={() => {
          overlay.open(({ isOpen, close }) => (
            <BottomSheet
              isOpen={isOpen}
              close={(_: boolean) => close()}
              defaultCloseValue={false}
            >
              <BottomSheet.Header>No Body Bottom Sheet</BottomSheet.Header>
              <BottomSheet.Footer>
                <BottomSheet.Close
                  className="flex justify-end"
                  closeValue={false}
                >
                  <Button variant="text">Close</Button>
                </BottomSheet.Close>
              </BottomSheet.Footer>
            </BottomSheet>
          ));
        }}
      />
    </StoryContainer>
  ),
};

export const AsyncBottomSheet: Story = {
  args: {
    ...storyArgs,
    children: 'Open Bottom Sheet (Async)',
  },
  render: (args) => (
    <StoryContainer>
      <Button
        {...args}
        onClick={async () => {
          const result = await overlay.openAsync<boolean>(
            ({ isOpen, close }) => (
              <BottomSheet
                isOpen={isOpen}
                close={close}
                defaultCloseValue={false}
              >
                <BottomSheet.Header>Async Bottom Sheet</BottomSheet.Header>
                <BottomSheet.Body>
                  Clicking confirm returns true, cancel returns false.
                </BottomSheet.Body>
                <BottomSheet.Footer>
                  <BottomSheet.Close closeValue={false} className="grow">
                    <Button variant="secondary" className="w-full">
                      Cancel
                    </Button>
                  </BottomSheet.Close>
                  <BottomSheet.Close closeValue={true} className="grow">
                    <Button variant="primary" className="w-full">
                      Confirm
                    </Button>
                  </BottomSheet.Close>
                </BottomSheet.Footer>
              </BottomSheet>
            ),
          );
          alert(`Result: ${result}`);
        }}
      />
    </StoryContainer>
  ),
};
