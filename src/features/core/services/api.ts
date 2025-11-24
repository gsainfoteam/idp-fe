import createFetchClient, { Middleware } from 'openapi-fetch';
import createClient from 'openapi-react-query';
import type { ErrorStatus, HttpMethod } from 'openapi-typescript-helpers';

import type { paths } from '@/@types/api-schema';
import { postAuthRefresh } from '@/data/auth';
import { useToken } from '@/features/auth';
import { Log } from '@/features/core';

interface AuxiliaryRequestInit extends Request {
  retry?: boolean;
  keepToken?: boolean;
}

const middleware: Middleware = {
  async onRequest({ request }) {
    const token = useToken.getState().token;

    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`);
    }

    return request;
  },
  async onResponse({ request, response, options }) {
    const auxiliaryRequest = request as AuxiliaryRequestInit;
    if (response?.status === 401) {
      if (auxiliaryRequest.retry) {
        if (!auxiliaryRequest.keepToken) {
          useToken.getState().saveToken(null);
        }
      } else {
        const refreshRes = await postAuthRefresh();

        if (refreshRes.ok) {
          useToken.getState().saveToken(refreshRes.data.accessToken);
          auxiliaryRequest.retry = true;
          return options.fetch(auxiliaryRequest);
        } else {
          if (!auxiliaryRequest.keepToken) {
            useToken.getState().saveToken(null);
          }
        }
      }
    }

    if (response.status >= 400) {
      Log.error('api', {
        endpoint: new URL(request.url).pathname,
        status: response.status,
        method: request.method as HttpMethod,
      });
      return Promise.reject(response);
    }

    return response;
  },
  async onError({ error, request }) {
    if (request.url.includes('/auth/refresh')) {
      return Promise.reject(`Error refreshing token: ${error}`);
    }
    if (request.url.includes('/auth/login')) {
      return Promise.reject(`Error in login: ${error}`);
    }

    return Promise.reject(`Error in request: ${error}`);
  },
};

export const api = createFetchClient<paths>({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: 'include',
});
api.use(middleware);

export const $api = createClient(api);

// input type

export type ApiRequestBody<
  TPath extends keyof paths,
  TMethod extends HttpMethod,
> = paths[TPath][TMethod] extends { requestBody: infer RB }
  ? RB extends { content: infer C }
    ? C extends Record<string, infer B>
      ? B
      : never
    : never
  : never;

export type ApiQueryParams<
  TPath extends keyof paths,
  TMethod extends HttpMethod,
> = paths[TPath][TMethod] extends { parameters: infer P }
  ? P extends { query: infer Q }
    ? Q
    : never
  : never;

export type ApiPathParams<
  TPath extends keyof paths,
  TMethod extends HttpMethod,
> = paths[TPath][TMethod] extends { parameters: infer P }
  ? P extends { path: infer PP }
    ? PP
    : never
  : never;

export type ApiHeaderParams<
  TPath extends keyof paths,
  TMethod extends HttpMethod,
> = paths[TPath][TMethod] extends { parameters: infer P }
  ? P extends { header: infer H }
    ? H
    : never
  : never;

// output type

export type ApiPayload<TData, TStatus extends number = number> =
  | { ok: true; data: TData }
  | { ok: false; status?: TStatus };

type ExtractResponse<R, TStatus extends number> = TStatus extends keyof R
  ? R[TStatus] extends { content: { 'application/json': infer D } }
    ? D
    : R[TStatus] extends { content?: never }
      ? void
      : never
  : never;

export type ApiResponse<
  TPath extends keyof paths,
  TMethod extends HttpMethod,
  TSuccessStatus extends number = 200 | 201,
> = paths[TPath][TMethod] extends { responses: infer R }
  ? ExtractResponse<R, TSuccessStatus> extends never
    ? ExtractResponse<R, 200> extends never
      ? ExtractResponse<R, 201>
      : ExtractResponse<R, 200>
    : ExtractResponse<R, TSuccessStatus>
  : never;

export type ApiErrorStatus<
  TPath extends keyof paths,
  TMethod extends HttpMethod,
> = paths[TPath][TMethod] extends { responses: infer R }
  ? Extract<keyof R, ErrorStatus>
  : never;

export type ApiResult<
  TPath extends keyof paths,
  TMethod extends HttpMethod,
  TSuccessStatus extends number = 200 | 201,
> = ApiPayload<
  ApiResponse<TPath, TMethod, TSuccessStatus>,
  ApiErrorStatus<TPath, TMethod> extends number
    ? ApiErrorStatus<TPath, TMethod>
    : number
>;

// helper functions

export function handleApiResult<
  TPath extends keyof paths,
  TMethod extends HttpMethod,
  TSuccessStatus extends number = 200 | 201,
>(response: {
  data?: ApiResponse<TPath, TMethod, TSuccessStatus>;
}): ApiPayload<ApiResponse<TPath, TMethod, TSuccessStatus>, never> {
  return {
    ok: true as const,
    data: response.data as ApiResponse<TPath, TMethod, TSuccessStatus>,
  };
}

export function handleApiError<
  TPath extends keyof paths,
  TMethod extends HttpMethod,
>(err: unknown): ApiPayload<never, ApiErrorStatus<TPath, TMethod>> {
  if (err instanceof Response) {
    const status = err.status as ApiErrorStatus<TPath, TMethod>;
    return { ok: false, status };
  }
  return { ok: false };
}
