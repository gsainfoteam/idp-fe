import createFetchClient, { MergedOptions, Middleware } from 'openapi-fetch';
import createClient from 'openapi-react-query';

import type { paths } from '@/@types/api-schema';
import { useToken } from '@/features/auth';

interface AuxiliaryOptions extends MergedOptions {
  retry?: boolean;
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
    const auxiliaryOptions = options as AuxiliaryOptions;
    if (response?.status === 401) {
      if (auxiliaryOptions.retry) {
        useToken.getState().saveToken(null);
        return Promise.resolve(response);
      }
      const refreshRes = await fetch(
        'https://api.stg.idp.gistory.me/auth/refresh',
        { method: 'POST', credentials: 'include' },
      ).catch(() => null);

      if (refreshRes && refreshRes.ok) {
        const { accessToken } = await refreshRes.json();
        useToken.getState().saveToken(accessToken);
        auxiliaryOptions.retry = true;

        const retriedRequest = new Request(request, {
          headers: new Headers({
            ...Object.fromEntries(request.headers),
            Authorization: `Bearer ${accessToken}`,
          }),
        });
        return options.fetch(retriedRequest);
      } else {
        useToken.getState().saveToken(null);
      }
    }

    if (response.status >= 400) {
      return Promise.reject(response);
    }

    return response;
  },
  async onError({ error, request }) {
    if (request.url === 'https://api.stg.idp.gistory.me/auth/refresh') {
      return Promise.reject(`Error refreshing token: ${error}`);
    } else {
      return Promise.reject(`Error in request: ${error}`);
    }
  },
};

export const api = createFetchClient<paths>({
  baseUrl: 'https://api.stg.idp.gistory.me',
  credentials: 'include',
});
api.use(middleware);

export const $api = createClient(api);
