import type { Meta, StoryObj } from '@storybook/react';
import { OverlayProvider, overlay } from 'overlay-kit';

import { Button, Modal } from '@/features/core';

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
    children: 'Open Modal (0 CTA)',
  },
  render: (args) => (
    <StoryContainer>
      <Button
        {...args}
        onClick={() => {
          overlay.open(({ isOpen, close }) => (
            <Modal
              isOpen={isOpen}
              close={(_: boolean) => close()}
              defaultCloseValue={false}
            >
              <Modal.Header>Body Only Modal</Modal.Header>
              <Modal.Body>
                This modal has no CTA buttons. Close via backdrop or ESC.
              </Modal.Body>
            </Modal>
          ));
        }}
      />
    </StoryContainer>
  ),
};

export const OneCTA: Story = {
  args: {
    ...storyArgs,
    children: 'Open Modal (1 CTA)',
  },
  render: (args) => (
    <StoryContainer>
      <Button
        {...args}
        onClick={() => {
          overlay.open(({ isOpen, close }) => (
            <Modal
              isOpen={isOpen}
              close={(_: boolean) => close()}
              defaultCloseValue={false}
            >
              <Modal.Header>Single CTA Modal</Modal.Header>
              <Modal.Body>This modal has a single confirm button.</Modal.Body>
              <Modal.Footer>
                <Modal.Close className="w-full" closeValue={true}>
                  <Button
                    variant="primary"
                    onClick={() => alert('Confirmed!')}
                    className="w-full"
                  >
                    Confirm
                  </Button>
                </Modal.Close>
              </Modal.Footer>
            </Modal>
          ));
        }}
      />
    </StoryContainer>
  ),
};

export const TwoCTA: Story = {
  args: {
    ...storyArgs,
    children: 'Open Modal (2 CTA)',
  },
  render: (args) => (
    <StoryContainer>
      <Button
        {...args}
        onClick={() => {
          overlay.open(({ isOpen, close }) => (
            <Modal
              isOpen={isOpen}
              close={(_: boolean) => close()}
              defaultCloseValue={false}
            >
              <Modal.Header>Two CTA Modal</Modal.Header>
              <Modal.Body>
                This modal has cancel and confirm buttons.
              </Modal.Body>
              <Modal.Footer>
                <Modal.Close className="grow" closeValue={false}>
                  <Button variant="secondary" className="w-full">
                    Cancel
                  </Button>
                </Modal.Close>
                <Modal.Close className="grow" closeValue={true}>
                  <Button
                    variant="primary"
                    onClick={() => alert('Confirmed!')}
                    className="w-full"
                  >
                    Confirm
                  </Button>
                </Modal.Close>
              </Modal.Footer>
            </Modal>
          ));
        }}
      />
    </StoryContainer>
  ),
};

export const ThreeCTA: Story = {
  args: {
    ...storyArgs,
    children: 'Open Modal (3 CTA)',
  },
  render: (args) => (
    <StoryContainer>
      <Button
        {...args}
        onClick={() => {
          overlay.open(({ isOpen, close }) => (
            <Modal
              isOpen={isOpen}
              close={(_: boolean) => close()}
              defaultCloseValue={false}
            >
              <Modal.Header>Three CTA Modal</Modal.Header>
              <Modal.Body>
                This modal has cancel, maybe, and confirm buttons.
              </Modal.Body>
              <Modal.Footer>
                <Modal.Close className="grow" closeValue={false}>
                  <Button variant="secondary" className="w-full">
                    Cancel
                  </Button>
                </Modal.Close>
                <Modal.Close className="grow" closeValue={false}>
                  <Button variant="secondary" className="w-full">
                    Maybe
                  </Button>
                </Modal.Close>
                <Modal.Close className="grow" closeValue={true}>
                  <Button
                    variant="primary"
                    onClick={() => alert('Confirmed!')}
                    className="w-full"
                  >
                    Confirm
                  </Button>
                </Modal.Close>
              </Modal.Footer>
            </Modal>
          ));
        }}
      />
    </StoryContainer>
  ),
};

export const NoBody: Story = {
  args: {
    ...storyArgs,
    children: 'Open Modal (No Body)',
  },
  render: (args) => (
    <StoryContainer>
      <Button
        {...args}
        onClick={() => {
          overlay.open(({ isOpen, close }) => (
            <Modal
              isOpen={isOpen}
              close={(_: boolean) => close()}
              defaultCloseValue={false}
            >
              <Modal.Header>No Body Modal</Modal.Header>
              <Modal.Footer>
                <Modal.Close className="flex justify-end" closeValue={false}>
                  <Button variant="text">Close</Button>
                </Modal.Close>
              </Modal.Footer>
            </Modal>
          ));
        }}
      />
    </StoryContainer>
  ),
};

export const AsyncModal: Story = {
  args: {
    ...storyArgs,
    children: 'Open Modal (Async)',
  },
  render: (args) => (
    <StoryContainer>
      <Button
        {...args}
        onClick={async () => {
          const result = await overlay.openAsync<boolean>(
            ({ isOpen, close }) => (
              <Modal isOpen={isOpen} close={close} defaultCloseValue={false}>
                <Modal.Header>Async Modal</Modal.Header>
                <Modal.Body>
                  Clicking confirm returns true, cancel returns false.
                </Modal.Body>
                <Modal.Footer>
                  <Modal.Close closeValue={false} className="grow">
                    <Button variant="secondary" className="w-full">
                      Cancel
                    </Button>
                  </Modal.Close>
                  <Modal.Close closeValue={true} className="grow">
                    <Button variant="primary" className="w-full">
                      Confirm
                    </Button>
                  </Modal.Close>
                </Modal.Footer>
              </Modal>
            ),
          );
          alert(`Result: ${result}`);
        }}
      />
    </StoryContainer>
  ),
};
