import { RouterHistory } from '@tanstack/react-router';
import { PropsWithChildren, useCallback, useState } from 'react';

import { cn } from '../utils/cn';

import { BackButton } from './back-button';
import { LoadingOverlay } from './loading-overlay';
import { motion, usePresenceData } from 'framer-motion';

export interface FunnelLayoutProps extends React.Attributes {
  title?: string;
  stepTitle?: React.ReactNode;
  description?: string | null;
  button?: React.ReactNode;
  hideUndo?: boolean;
  loading?: boolean;
  onUndo?: (history: RouterHistory) => void;
  contentClassName?: string;
}

function FunnelLayout({
  key,
  title,
  stepTitle,
  description,
  button,
  hideUndo = false,
  loading = false,
  onUndo,
  contentClassName,
  children,
}: PropsWithChildren<FunnelLayoutProps>) {
  const direction = usePresenceData() ?? 1;
  const [scrollAmount, setScrollAmount] = useState(0);
  const scrollRef = useCallback((div: HTMLDivElement) => {
    const handler = () => setScrollAmount(div.scrollTop);

    div.addEventListener('scroll', handler);
    return () => div.removeEventListener('scroll', handler);
  }, []);

  return (
    <motion.div
      layout
      key={key}
      initial={{ x: direction > 0 ? 100 : -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: direction < 0 ? 100 : -100, opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-funnel-background flex h-dvh items-center justify-center"
    >
      <div className="relative aspect-[420/800] h-dvh w-auto max-w-full">
        <div className="bg-funnel-background flex h-full w-full flex-col">
          {/* Title Bar */}
          <div
            className={cn(
              'bg-funnel-background z-10 w-full px-5 py-4',
              scrollAmount > 0 && 'shadow-funnel-shadow shadow-[0_8px_8px_0]',
            )}
          >
            <div className="relative flex h-fit items-center justify-center">
              {title && !hideUndo && (
                <div className="absolute left-0">
                  <BackButton
                    style={{ color: 'var(--color-back-button)' }}
                    onUndo={onUndo}
                  />
                </div>
              )}
              <div className="font-title-3 text-funnel-title text-center">
                {title}
              </div>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex w-full flex-1 flex-col overflow-y-scroll [&::-webkit-scrollbar]:hidden"
          >
            <LoadingOverlay show={loading} className="flex flex-1 flex-col">
              {/* Step Title Box */}
              {stepTitle && (
                <div className="bg-funnel-background z-0 w-full px-5 py-4">
                  <div className="text-title-1 text-funnel-steptitle w-full text-pretty whitespace-pre-wrap">
                    {stepTitle}
                  </div>
                  {description && (
                    <>
                      <div className="h-2" />
                      <div className="text-body-1 text-funnel-description text-pretty whitespace-pre-wrap">
                        {description}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Content Box */}
              <div
                className={cn(
                  'bg-funnel-background relative z-0 w-full flex-1 px-5 py-4',
                  contentClassName,
                )}
              >
                {children}
              </div>
            </LoadingOverlay>
          </div>

          {/* CTA Button Box */}
          <div className="bg-funnel-background shadow-funnel-shadow z-10 w-full px-5 py-4 shadow-[0_-8px_8px_0]">
            {button && <div className="mt-auto w-full">{button}</div>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

FunnelLayout.Separator = () => {
  return <div className="bg-funnel-separator -mx-5 h-2" />;
};

export { FunnelLayout };
