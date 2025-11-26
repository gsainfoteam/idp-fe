import { type AnyContext } from '@tanstack/react-router';
import { type AnyFunnelState } from '@use-funnel/core';

declare module '@tanstack/react-router' {
  export interface HistoryState {
    funnelContext: Record<string, AnyContext>;
    funnelHistories: Record<string, AnyFunnelState[]>;
  }
}
