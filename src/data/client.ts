import {
  ApiPathParams,
  ApiQueryParams,
  ApiRequestBody,
  ApiResult,
  api,
  handleApiError,
  handleApiResult,
} from '@/features/core';

export const deleteClientMember = async (
  pathParams: ApiPathParams<'/client/{clientId}/members/{userId}', 'delete'>,
): Promise<ApiResult<'/client/{clientId}/members/{userId}', 'delete'>> => {
  return api
    .DELETE('/client/{clientId}/members/{userId}', {
      params: { path: pathParams },
    })
    .then(handleApiResult<'/client/{clientId}/members/{userId}', 'delete'>)
    .catch(handleApiError<'/client/{clientId}/members/{userId}', 'delete'>);
};

export const deleteClientPicture = async (
  pathParams: ApiPathParams<'/client/{clientId}/picture', 'delete'>,
): Promise<ApiResult<'/client/{clientId}/picture', 'delete'>> => {
  return api
    .DELETE('/client/{clientId}/picture', {
      params: {
        path: pathParams,
      },
    })
    .then(handleApiResult<'/client/{clientId}/picture', 'delete'>)
    .catch(handleApiError<'/client/{clientId}/picture', 'delete'>);
};

export const getClient = async (
  pathParams: ApiPathParams<'/client/{clientId}', 'get'>,
): Promise<ApiResult<'/client/{clientId}', 'get'>> => {
  return api
    .GET('/client/{clientId}', {
      params: { path: pathParams },
    })
    .then(handleApiResult<'/client/{clientId}', 'get'>)
    .catch(handleApiError<'/client/{clientId}', 'get'>);
};

export const getClientList = async (): Promise<ApiResult<'/client', 'get'>> => {
  return api
    .GET('/client')
    .then(handleApiResult<'/client', 'get'>)
    .catch(handleApiError<'/client', 'get'>);
};

export const getClientPublic = async (
  pathParams: ApiPathParams<'/client/{clientId}/public', 'get'>,
): Promise<ApiResult<'/client/{clientId}/public', 'get'>> => {
  return api
    .GET('/client/{clientId}/public', {
      params: { path: pathParams },
    })
    .then(handleApiResult<'/client/{clientId}/public', 'get'>)
    .catch(handleApiError<'/client/{clientId}/public', 'get'>);
};

export const patchClient = async (
  pathParams: ApiPathParams<'/client/{clientId}', 'patch'>,
  requestBody: ApiRequestBody<'/client/{clientId}', 'patch'>,
): Promise<ApiResult<'/client/{clientId}', 'patch'>> => {
  return api
    .PATCH('/client/{clientId}', {
      params: { path: pathParams },
      body: requestBody,
    })
    .then(handleApiResult<'/client/{clientId}', 'patch'>)
    .catch(handleApiError<'/client/{clientId}', 'patch'>);
};

export const patchClientPicture = async (
  pathParams: ApiPathParams<'/client/{clientId}/picture', 'patch'>,
  queryParams: ApiQueryParams<'/client/{clientId}/picture', 'patch'>,
): Promise<ApiResult<'/client/{clientId}/picture', 'patch'>> => {
  return api
    .PATCH('/client/{clientId}/picture', {
      params: {
        path: pathParams,
        query: queryParams,
      },
    })
    .then(handleApiResult<'/client/{clientId}/picture', 'patch'>)
    .catch(handleApiError<'/client/{clientId}/picture', 'patch'>);
};

export const patchClientMemberRole = async (
  pathParams: ApiPathParams<
    '/client/{clientId}/members/{userId}/role',
    'patch'
  >,
  requestBody: ApiRequestBody<
    '/client/{clientId}/members/{userId}/role',
    'patch'
  >,
): Promise<ApiResult<'/client/{clientId}/members/{userId}/role', 'patch'>> => {
  return api
    .PATCH('/client/{clientId}/members/{userId}/role', {
      params: { path: pathParams },
      body: requestBody,
    })
    .then(handleApiResult<'/client/{clientId}/members/{userId}/role', 'patch'>)
    .catch(handleApiError<'/client/{clientId}/members/{userId}/role', 'patch'>);
};

export const patchClientSecret = async (
  pathParams: ApiPathParams<'/client/{clientId}/secret', 'patch'>,
): Promise<ApiResult<'/client/{clientId}/secret', 'patch'>> => {
  return api
    .PATCH('/client/{clientId}/secret', {
      params: { path: pathParams },
    })
    .then(handleApiResult<'/client/{clientId}/secret', 'patch'>)
    .catch(handleApiError<'/client/{clientId}/secret', 'patch'>);
};

export const postClient = async (
  requestBody: ApiRequestBody<'/client', 'post'>,
): Promise<ApiResult<'/client', 'post', 201>> => {
  return api
    .POST('/client', { body: requestBody })
    .then(handleApiResult<'/client', 'post', 201>)
    .catch(handleApiError<'/client', 'post'>);
};

export const postClientDelete = async (
  pathParams: ApiPathParams<'/client/{clientId}/delete', 'post'>,
): Promise<ApiResult<'/client/{clientId}/delete', 'post'>> => {
  return api
    .POST('/client/{clientId}/delete', {
      params: {
        path: pathParams,
      },
    })
    .then(handleApiResult<'/client/{clientId}/delete', 'post'>)
    .catch(handleApiError<'/client/{clientId}/delete', 'post'>);
};

export const postClientMember = async (
  pathParams: ApiPathParams<'/client/{clientId}/members', 'post'>,
  requestBody: ApiRequestBody<'/client/{clientId}/members', 'post'>,
): Promise<ApiResult<'/client/{clientId}/members', 'post'>> => {
  return api
    .POST('/client/{clientId}/members', {
      params: { path: pathParams },
      body: requestBody,
    })
    .then(handleApiResult<'/client/{clientId}/members', 'post'>)
    .catch(handleApiError<'/client/{clientId}/members', 'post'>);
};
