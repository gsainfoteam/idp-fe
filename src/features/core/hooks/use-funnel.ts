import {
  useLocation,
  useNavigate,
  useRouter,
  useSearch,
} from '@tanstack/react-router';
import { createUseFunnel } from '@use-funnel/core';
import { useMemo } from 'react';

interface TanstackRouterRouteOption {
  viewTransition?: boolean;
  resetScroll?: boolean;
}

export const useFunnel = createUseFunnel<TanstackRouterRouteOption>(
  ({ id, initialState }) => {
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
        push(state, { resetScroll, viewTransition } = {}) {
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
        replace(state, { resetScroll, viewTransition } = {}) {
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
        go(index) {
          router.history.go(index);
        },
        cleanup() {
          const newLocationState = { ...location.state };
          const currentSearchParams = new URLSearchParams(
            window.location.search,
          );

          if (
            !currentSearchParams.has(stepName) ||
            !(id in (newLocationState.funnelContext ?? {})) ||
            !(id in (newLocationState.funnelHistories ?? {}))
          )
            return;

          delete newLocationState.funnelContext[id];
          delete newLocationState.funnelHistories[id];

          const searchParams = new URLSearchParams([
            ...Object.entries(search).filter(
              (v): v is [string, string] =>
                v[1] !== undefined && v[0] !== stepName,
            ),
          ]);

          navigate({
            replace: true,
            to: `${location.pathname}?${searchParams.toString()}`,
            state: newLocationState,
          });
        },
      }),
      [
        currentIndex,
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
  },
);

export function useCleanupFunnel() {
  const location = useLocation();
  const search = useSearch({ strict: false });
  const navigate = useNavigate();

  return (stepName?: `${string}-step`) => {
    const currentSearchParams = new URLSearchParams(window.location.search);
    const newLocationState = { ...location.state };

    Object.entries(search).forEach((v) => {
      if (v[0].endsWith('-step')) stepName = v[0] as `${string}-step`;
    });
    if (stepName == null) return;

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
        (v): v is [string, string] => v[1] !== undefined && v[0] !== stepName,
      ),
    ]);

    navigate({
      replace: true,
      to: `${location.pathname}?${searchParams.toString()}`,
      state: newLocationState,
    });
  };
}
