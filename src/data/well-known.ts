import {
  type ApiResult,
  api,
  handleApiError,
  handleApiResult,
} from '@/features/core';

export const getOpenidConfiguration = async (): Promise<
  ApiResult<'/.well-known/openid-configuration', 'get'>
> => {
  return api
    .GET('/.well-known/openid-configuration')
    .then(handleApiResult<'/.well-known/openid-configuration', 'get'>)
    .catch(handleApiError<'/.well-known/openid-configuration', 'get'>);
};
