import type { Meta, StoryObj } from '@storybook/react';
import toast, { Toaster, ToastBar } from 'react-hot-toast';
import { Button } from '@/features/core';
import { ReactElement } from 'react';

function ToastTestFrame({ label }: { label: string }) {
  return (
    <div className="bg-funnel-background absolute inset-0">
      <div className="flex flex-col gap-4 p-4">
        <Button variant="default" onClick={() => toast(label)}>
          Show Blank Toast
        </Button>
        <Button variant="default" onClick={() => toast.success(label)}>
          Show Success Toast
        </Button>
        <Button variant="default" onClick={() => toast.error(label)}>
          Show Error Toast
        </Button>
        <Button variant="default" onClick={() => toast.loading(label)}>
          Show Loading Toast
        </Button>
      </div>
    </div>
  );
}

const meta = {
  component: ToastTestFrame,
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster
          toastOptions={{
            style: {
              background: 'var(--color-toast-background)',
              color: 'var(--color-toast-text)',
              border: '1px solid var(--color-toast-border)',
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 12,
              paddingRight: 12,
            },
            duration: 100000,
            success: {
              iconTheme: {
                primary: 'var(--color-toast-icon-success)',
                secondary: 'white',
              },
            },
            error: {
              iconTheme: {
                primary: 'var(--color-toast-icon-error)',
                secondary: 'white',
              },
            },
          }}
        >
          {(t) => (
            <ToastBar toast={t}>
              {({ icon, message }) => (
                <div className="flex items-center gap-3">
                  {icon}
                  <div className="text-body-1">
                    {
                      (message as ReactElement<{ children: string }>).props
                        .children
                    }
                  </div>
                </div>
              )}
            </ToastBar>
          )}
        </Toaster>
      </>
    ),
  ],
} satisfies Meta<typeof ToastTestFrame>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'hello',
  },
  render: ({ label }) => <ToastTestFrame label={label} />,
};
