import { useEffect, useMemo } from 'react';

import {
  useLocation,
  useNavigate,
  useRouter,
  useSearch,
} from '@tanstack/react-router';
import { AnyFunnelState, createUseFunnel } from '@use-funnel/core';

import { Log } from '../utils/log';

type AnyContext = Record<string, any>;
type AnyStepContextMap = Record<string, AnyContext>;

interface TanstackRouterRouteOption {
  viewTransition?: boolean;
  resetScroll?: boolean;
}

const useFunnelRouter = ({
  id,
  initialState,
}: {
  id: string;
  initialState: AnyFunnelState;
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const router = useRouter();
  const search = useSearch({ strict: false });

  const stepName = `${id}-step` as const;
  const currentStep = new URLSearchParams(location.searchStr).get(stepName);
  const currentContext = location.state?.funnelContext?.[id];
  const currentState = useMemo(() => {
    return currentStep != null && currentContext != null
      ? ({
          step: currentStep,
          context: currentContext,
        } as typeof initialState)
      : initialState;
  }, [currentStep, currentContext, initialState]);

  const history: (typeof initialState)[] = useMemo(() => {
    const histories = location.state?.funnelHistories?.[id];
    if (Array.isArray(histories) && histories.length > 0) {
      return histories;
    } else {
      return [currentState];
    }
  }, [location.state?.funnelHistories, id, currentState]);
  const currentIndex = history.length - 1;

  return useMemo(
    () => ({
      history,
      currentIndex,
      currentState,
      push(
        state: AnyFunnelState,
        { resetScroll, viewTransition }: TanstackRouterRouteOption = {},
      ) {
        const searchParams = new URLSearchParams([
          ...Object.entries(search).filter(
            (v): v is [string, string] => v[1] !== undefined,
          ),
          ...(state.step != null ? [[stepName, state.step]] : []),
        ]);

        searchParams.set(stepName, state.step);

        navigate({
          replace: false,
          to: `${location.pathname}?${searchParams.toString()}`,
          state: {
            ...location.state,
            funnelContext: {
              ...location.state?.funnelContext,
              [id]: state.context,
            },
            funnelHistories: {
              ...location.state?.funnelHistories,
              [id]: [...(history ?? []), state],
            },
          },
          viewTransition,
          resetScroll,
        });
      },
      replace(
        state: AnyFunnelState,
        { resetScroll, viewTransition }: TanstackRouterRouteOption = {},
      ) {
        const searchParams = new URLSearchParams([
          ...Object.entries(search).filter(
            (v): v is [string, string] => v[1] !== undefined,
          ),
          ...(state.step != null ? [[stepName, state.step]] : []),
        ]);

        searchParams.set(stepName, state.step);

        navigate({
          replace: true,
          to: `${location.pathname}?${searchParams.toString()}`,
          state: {
            ...location.state,
            funnelContext: {
              ...location.state?.funnelContext,
              [id]: state.context,
            },
            funnelHistories: {
              ...location.state?.funnelHistories,
              [id]: [...(history ?? []).slice(0, currentIndex), state],
            },
          },
          viewTransition,
          resetScroll,
        });
      },
      go(index: number) {
        router.history.go(index);
      },
      async cleanup() {
        const currentSearchParams = new URLSearchParams(window.location.search);
        const newLocationState = { ...location.state };
        const id = stepName.split('-')[0]!;

        if (
          !currentSearchParams.has(stepName) ||
          !(id in (newLocationState.funnelContext ?? {})) ||
          !(id in (newLocationState.funnelHistories ?? {}))
        ) {
          return;
        }

        delete newLocationState.funnelContext[id];
        delete newLocationState.funnelHistories[id];

        const searchParams = new URLSearchParams([
          ...Object.entries(search).filter(
            (v): v is [string, string] =>
              v[1] !== undefined && v[0] !== stepName,
          ),
        ]);

        await navigate({
          replace: true,
          to: `${location.pathname}?${searchParams.toString()}`,
          state: newLocationState,
        });
      },
    }),
    [
      currentIndex,
      currentState,
      history,
      id,
      location.pathname,
      location.state,
      navigate,
      router.history,
      search,
      stepName,
    ],
  );
};

const useFunnelInternal =
  createUseFunnel<TanstackRouterRouteOption>(useFunnelRouter);

export const useFunnel = <TStepContextMap extends AnyStepContextMap>(
  ...props: Parameters<typeof useFunnelInternal<TStepContextMap>>
) => {
  const { id, initial: initialState } = props[0];

  const {
    history: baseHistory,
    Render,
    ...funnel
  } = useFunnelInternal<TStepContextMap>(...props);
  const router = useFunnelRouter({ id, initialState });

  useEffect(() => {
    const step = router.currentState.step;
    if (!step) return;

    const context = router.currentState.context;
    Log.funnel(id, step, context);
  }, [id, router.currentState.step, router.currentState.context]);

  return {
    ...funnel,
    Render,
    history: {
      ...baseHistory,
      cleanup: router.cleanup,
    },
  };
};
