import {
  type ApiRequestBody,
  type ApiResult,
  api,
  handleApiError,
  handleApiResult,
} from '@/features/core';

export const deleteAuthLogout = async (): Promise<
  ApiResult<'/auth/logout', 'delete'>
> => {
  return api
    .DELETE('/auth/logout')
    .then(handleApiResult<'/auth/logout', 'delete'>)
    .catch(handleApiError<'/auth/logout', 'delete'>);
};

export const postAuthLogin = async (
  requestBody: ApiRequestBody<'/auth/login', 'post'>,
): Promise<ApiResult<'/auth/login', 'post', 201>> => {
  return api
    .POST('/auth/login', {
      body: requestBody,
      retry: true,
      keepToken: true,
    })
    .then(handleApiResult<'/auth/login', 'post', 201>)
    .catch(handleApiError<'/auth/login', 'post'>);
};

export const postAuthPasskey = async (): Promise<
  ApiResult<'/auth/passkey', 'post'>
> => {
  return api
    .POST('/auth/passkey')
    .then(handleApiResult<'/auth/passkey', 'post'>)
    .catch(handleApiError<'/auth/passkey', 'post'>);
};

export const postAuthPasskeyVerify = async (
  requestBody: ApiRequestBody<'/auth/passkey/verify', 'post'>,
): Promise<ApiResult<'/auth/passkey/verify', 'post', 201>> => {
  return api
    .POST('/auth/passkey/verify', {
      body: requestBody,
    })
    .then(handleApiResult<'/auth/passkey/verify', 'post', 201>)
    .catch(handleApiError<'/auth/passkey/verify', 'post'>);
};

export const postAuthRefresh = async (): Promise<
  ApiResult<'/auth/refresh', 'post'>
> => {
  return api
    .POST('/auth/refresh', {
      retry: true,
      keepToken: true,
    })
    .then(handleApiResult<'/auth/refresh', 'post'>)
    .catch(handleApiError<'/auth/refresh', 'post'>);
};
