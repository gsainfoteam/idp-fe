import createClient from 'openapi-fetch';

import type { paths } from '@/@types/api-schema';
import { Middleware } from '@/@types/openapi-fetch';
import { useToken } from '@/features/auth';

export const api = createClient<paths>({
  baseUrl: 'https://api.stg.idp.gistory.me',
  credentials: 'include',
});

const middleware: Middleware = {
  async onRequest({ request }) {
    const token = useToken.getState().token;

    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`);
    }

    return request;
  },
  async onResponse({ request, response, options }) {
    if (response?.status === 401 && !options.retry) {
      const refreshRes = await fetch(
        'https://api.stg.idp.gistory.me/auth/refresh',
        {
          method: 'POST',
          credentials: 'include',
        },
      ).catch(() => null);

      if (refreshRes && refreshRes.ok) {
        const { accessToken } = await refreshRes.json();
        useToken.getState().saveToken(accessToken);
        options.retry = true;

        const retriedRequest = new Request(request, {
          headers: new Headers({
            ...Object.fromEntries(request.headers),
            Authorization: `Bearer ${accessToken}`,
          }),
        });
        return fetch(retriedRequest);
      }
    }

    useToken.getState().saveToken(null); // Clear token if response is not ok
    return Promise.resolve(response);
  },
  async onError({ error, request }) {
    if (request.url === 'https://api.stg.idp.gistory.me/auth/refresh') {
      return Promise.reject(`Error refreshing token: ${error}`);
    } else {
      return Promise.reject(`Error in request: ${error}`);
    }
  },
};

api.use(middleware);
