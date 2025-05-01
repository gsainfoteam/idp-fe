import { PropsWithChildren } from 'react';

import { BackButton } from './back-button';

interface FunnelStepProps {
  screenName?: string;
  title?: string;
  description?: string;
  button?: React.ReactNode;
}

export function FunnelStep({
  screenName,
  title,
  description,
  button,
  children,
}: PropsWithChildren<FunnelStepProps>) {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="relative h-screen w-full pt-12.5 pb-8.5 md:w-full md:max-w-[450px] md:py-8">
        <div className="flex h-full w-full flex-col px-5 py-6">
          {screenName && (
            <>
              <div className="relative flex h-12 items-center justify-center">
                <div className="absolute left-0">
                  <BackButton />
                </div>
                <div className="text-center font-medium">{screenName}</div>
              </div>
              <div className="h-6" />
            </>
          )}
          <div className="text-title-1 text-pretty whitespace-pre-wrap text-neutral-950">
            {title}
          </div>
          {description && (
            <>
              <div className="h-2" />
              <div className="text-body-1 text-pretty whitespace-pre-wrap text-neutral-500">
                {description}
              </div>
            </>
          )}
          <div className="h-8" />
          <div className="flex-1 overflow-y-auto">{children}</div>
          {button && (
            <>
              <div className="h-8" />
              <div className="z-10 mt-auto">{button}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
