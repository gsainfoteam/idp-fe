import createFetchClient, { Middleware } from 'openapi-fetch';
import createClient from 'openapi-react-query';

import type { paths } from '@/@types/api-schema';
import { postAuthRefresh } from '@/data/post-auth-refresh';
import { useToken } from '@/features/auth';

interface AuxiliaryRequestInit extends Request {
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
  async onResponse({ request, response }) {
    const auxiliaryRequest = request as AuxiliaryRequestInit;
    if (response?.status === 401) {
      if (auxiliaryRequest.retry) {
        useToken.getState().saveToken(null);
        return Promise.resolve(response);
      }
      const refreshRes = await postAuthRefresh();

      if (refreshRes && refreshRes.data) {
        useToken.getState().saveToken(refreshRes.data.accessToken);
        auxiliaryRequest.retry = true;
        return fetch(auxiliaryRequest);
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
    if (request.url.includes('/auth/refresh')) {
      return Promise.reject(`Error refreshing token: ${error}`);
    } else {
      return Promise.reject(`Error in request: ${error}`);
    }
  },
};

export const api = createFetchClient<paths>({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: 'include',
});
api.use(middleware);

export const $api = createClient(api);
