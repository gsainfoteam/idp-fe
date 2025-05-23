import { RouterHistory } from '@tanstack/react-router';
import { PropsWithChildren, useCallback, useState } from 'react';

import { cn } from '../utils/cn';

import { BackButton } from './back-button';
import { LoadingOverlay } from './loading-overlay';
import { motion, usePresenceData } from 'framer-motion';

interface FunnelLayoutProps extends React.Attributes {
  title?: string;
  stepTitle: React.ReactNode;
  description?: string;
  button?: React.ReactNode;
  hideUndo?: boolean;
  loading?: boolean;
  onUndo?: (history: RouterHistory) => void;
}

export function FunnelLayout({
  key,
  title,
  stepTitle,
  description,
  button,
  hideUndo = false,
  loading = false,
  onUndo,
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
      className="flex h-dvh items-center justify-center"
    >
      <div className="relative h-dvh w-full md:aspect-[420/800] md:w-auto">
        <div className="flex h-full w-full flex-col bg-white">
          {/* Title Bar */}
          <div
            className={cn(
              'z-10 w-full bg-white px-5 py-4',
              scrollAmount > 0 && 'shadow-[0_8px_8px_0] shadow-white',
            )}
          >
            <div className="relative flex h-fit items-center justify-center">
              {title && !hideUndo && (
                <div className="absolute left-0">
                  <BackButton
                    style={{ color: 'var(--color-neutral-600)' }}
                    onUndo={onUndo}
                  />
                </div>
              )}
              <div className="font-title-3 text-center text-neutral-600">
                {title}
              </div>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex w-full flex-1 flex-col overflow-y-auto"
          >
            <LoadingOverlay show={loading} className="flex flex-1 flex-col">
              {/* Step Title Box */}
              <div className="z-0 w-full bg-white px-5 py-4">
                <div className="text-title-1 w-full text-pretty whitespace-pre-wrap text-neutral-950">
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
              <div className="z-0 w-full flex-1 bg-white px-5 py-4">
                {children}
              </div>
            </LoadingOverlay>
          </div>

          {/* CTA Button Box */}
          <div className="z-10 w-full bg-white px-5 py-4 shadow-[0_-8px_8px_0] shadow-white">
            {button && <div className="mt-auto w-full">{button}</div>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
