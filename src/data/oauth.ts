import {
  type ApiHeaderParams,
  type ApiQueryParams,
  type ApiRequestBody,
  type ApiResult,
  api,
  handleApiError,
  handleApiResult,
} from '@/features/core';

export const deleteOauthToken = async (
  requestBody: ApiRequestBody<'/oauth/token', 'delete'>,
): Promise<ApiResult<'/oauth/token', 'delete'>> => {
  return api
    .DELETE('/oauth/token', {
      body: requestBody,
    })
    .then(handleApiResult<'/oauth/token', 'delete'>)
    .catch(handleApiError<'/oauth/token', 'delete'>);
};

export const getOauthAuthorize = async (
  params: ApiQueryParams<'/oauth/authorize', 'get'>,
): Promise<ApiResult<'/oauth/authorize', 'get'>> => {
  return api
    .GET('/oauth/authorize', {
      params: { query: params },
    })
    .then(handleApiResult<'/oauth/authorize', 'get'>)
    .catch(handleApiError<'/oauth/authorize', 'get'>);
};

export const getOauthCerts = async (): Promise<
  ApiResult<'/oauth/certs', 'get'>
> => {
  return api
    .GET('/oauth/certs')
    .then(handleApiResult<'/oauth/certs', 'get'>)
    .catch(handleApiError<'/oauth/certs', 'get'>);
};

export const getOauthUserinfo = async (
  queryParams: ApiQueryParams<'/oauth/userinfo', 'get'>,
  headerParams: ApiHeaderParams<'/oauth/userinfo', 'get'>,
): Promise<ApiResult<'/oauth/userinfo', 'get'>> => {
  return api
    .GET('/oauth/userinfo', {
      params: {
        query: queryParams,
        header: headerParams,
      },
    })
    .then(handleApiResult<'/oauth/userinfo', 'get'>)
    .catch(handleApiError<'/oauth/userinfo', 'get'>);
};

export const postOauthConsent = async (
  requestBody: ApiRequestBody<'/oauth/consent', 'post'>,
): Promise<ApiResult<'/oauth/consent', 'post', 201>> => {
  return api
    .POST('/oauth/consent', {
      body: requestBody,
    })
    .then(handleApiResult<'/oauth/consent', 'post', 201>)
    .catch(handleApiError<'/oauth/consent', 'post'>);
};

export const postOauthToken = async (
  requestBody: ApiRequestBody<'/oauth/token', 'post'>,
): Promise<ApiResult<'/oauth/token', 'post'>> => {
  return api
    .POST('/oauth/token', {
      body: requestBody,
    })
    .then(handleApiResult<'/oauth/token', 'post'>)
    .catch(handleApiError<'/oauth/token', 'post'>);
};
