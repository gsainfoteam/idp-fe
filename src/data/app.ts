import {
  ApiResult,
  api,
  handleApiError,
  handleApiResult,
} from '@/features/core';

export const getAppInfo = async (): Promise<ApiResult<'/', 'get'>> => {
  return api
    .GET('/')
    .then(handleApiResult<'/', 'get'>)
    .catch(handleApiError<'/', 'get'>);
};

export const getHealth = async (): Promise<ApiResult<'/health', 'get'>> => {
  return api
    .GET('/health')
    .then(handleApiResult<'/health', 'get'>)
    .catch(handleApiError<'/health', 'get'>);
};
