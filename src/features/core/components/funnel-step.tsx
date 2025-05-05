import { PropsWithChildren, useRef, useState } from 'react';

import { cn } from '../utils/cn';

import { BackButton } from './back-button';
import { LoadingOverlay } from './loading-overlay';

interface FunnelStepProps {
  title?: string;
  stepTitle: string;
  description?: string;
  button?: React.ReactNode;
  hideUndo?: boolean;
  loading?: boolean;
}

// TODO: 버튼 width를 w-full에서 w-fit로 바꾸면서 이상해진거 고치기

export function FunnelStep({
  title,
  stepTitle,
  description,
  button,
  hideUndo = false,
  loading = false,
  children,
}: PropsWithChildren<FunnelStepProps>) {
  const [scrollAmount, setScrollAmount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) setScrollAmount(scrollRef.current.scrollTop);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="relative h-screen w-full md:aspect-[450/800] md:w-auto">
        <div className="flex h-full w-full flex-col bg-white py-6">
          {/* Title Bar */}
          <div
            className={cn(
              'z-10 w-full bg-white px-5',
              scrollAmount > 0 && 'shadow-[0_8px_8px_0] shadow-white',
            )}
          >
            <div className="relative flex h-fit items-center justify-center">
              {title && !hideUndo && (
                <div className="absolute left-0">
                  <BackButton style={{ color: 'var(--color-neutral-600)' }} />
                </div>
              )}
              <div className="font-title-3 text-center text-neutral-600">
                {title}
              </div>
            </div>
            <div className="h-4" />
          </div>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex h-full w-full flex-col overflow-y-auto"
          >
            <LoadingOverlay show={loading}>
              {/* Step Title Box */}
              <div className="z-0 w-full bg-white px-5 pt-2 pb-6">
                <div className="text-title-1 text-pretty whitespace-pre-wrap text-neutral-950">
                  {stepTitle}
                </div>
                {description && (
                  <>
                    <div className="h-2" />
                    <div className="text-body-1 text-pretty whitespace-pre-wrap text-neutral-500">
                      {description}
                    </div>
                  </>
                )}
              </div>

              {/* Content Box */}
              <div className="relative z-0 w-full bg-white px-5">
                {children}
              </div>
            </LoadingOverlay>
          </div>

          {/* CTA Button Box */}
          <div className="z-10 w-full bg-white px-5 shadow-[0_-8px_8px_0] shadow-white">
            <div className="h-4" />
            {button && <div className="mt-auto w-full">{button}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
