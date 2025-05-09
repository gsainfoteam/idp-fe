import { AnyContext } from '@tanstack/react-router';
import { AnyFunnelState } from '@use-funnel/core';

declare module '@tanstack/react-router' {
  export interface HistoryState {
    funnelContext: Record<string, AnyContext>;
    funnelHistories: Record<string, AnyFunnelState[]>;
  }
}
