import {
  type ApiRequestBody,
  type ApiResult,
  api,
  handleApiError,
  handleApiResult,
} from '@/features/core';

export const postVerify = async (
  requestBody: ApiRequestBody<'/verify', 'post'>,
): Promise<ApiResult<'/verify', 'post'>> => {
  return api
    .POST('/verify', {
      body: requestBody,
    })
    .then(handleApiResult<'/verify', 'post'>)
    .catch(handleApiError<'/verify', 'post'>);
};

export const postVerifyEmail = async (
  requestBody: ApiRequestBody<'/verify/email', 'post'>,
): Promise<ApiResult<'/verify/email', 'post', 201>> => {
  return api
    .POST('/verify/email', {
      body: requestBody,
    })
    .then(handleApiResult<'/verify/email', 'post', 201>)
    .catch(handleApiError<'/verify/email', 'post'>);
};

export const postVerifyStudentId = async (
  requestBody: ApiRequestBody<'/verify/student-id', 'post'>,
): Promise<ApiResult<'/verify/student-id', 'post'>> => {
  return api
    .POST('/verify/student-id', {
      body: requestBody,
    })
    .then(handleApiResult<'/verify/student-id', 'post'>)
    .catch(handleApiError<'/verify/student-id', 'post'>);
};
