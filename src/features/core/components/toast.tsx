import {
  Toast as ToastType,
  ToastBar,
  Toaster,
  DefaultToastOptions,
} from 'react-hot-toast';

export function Toast({ t }: { t: ToastType }) {
  return (
    <ToastBar toast={t}>
      {({ icon, message }) => (
        <div className="flex items-center gap-3">
          {icon}
          <div className="[&>div]:text-body-1 [&>div]:!m-0">{message}</div>
        </div>
      )}
    </ToastBar>
  );
}

export function ToastProvider(props: DefaultToastOptions) {
  return (
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
        ...props,
      }}
    >
      {(t) => <Toast t={t} />}
    </Toaster>
  );
}
