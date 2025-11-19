import parsePhoneNumber from 'libphonenumber-js';

import {
  ApiPathParams,
  ApiQueryParams,
  ApiRequestBody,
  ApiResult,
  api,
  handleApiError,
  handleApiResult,
} from '@/features/core';

export const deleteUser = async ({
  password,
}: {
  password: string;
}): Promise<ApiResult<'/user', 'delete'>> => {
  return api
    .DELETE('/user', { body: { password } })
    .then(handleApiResult<'/user', 'delete'>)
    .catch(handleApiError<'/user', 'delete'>);
};

export const deleteUserPasskey = async (
  pathParams: ApiPathParams<'/user/passkey/{id}', 'delete'>,
): Promise<ApiResult<'/user/passkey/{id}', 'delete'>> => {
  return api
    .DELETE('/user/passkey/{id}', {
      params: { path: pathParams },
    })
    .then(handleApiResult<'/user/passkey/{id}', 'delete'>)
    .catch(handleApiError<'/user/passkey/{id}', 'delete'>);
};

export const deleteUserPicture = async (): Promise<
  ApiResult<'/user/picture', 'delete'>
> => {
  return api
    .DELETE('/user/picture')
    .then(handleApiResult<'/user/picture', 'delete'>)
    .catch(handleApiError<'/user/picture', 'delete'>);
};

export const getUser = async (): Promise<ApiResult<'/user', 'get'>> => {
  return api
    .GET('/user')
    .then(handleApiResult<'/user', 'get'>)
    .catch(handleApiError<'/user', 'get'>);
};

export const getUserConsent = async (): Promise<
  ApiResult<'/user/consent', 'get'>
> => {
  return api
    .GET('/user/consent')
    .then(handleApiResult<'/user/consent', 'get'>)
    .catch(handleApiError<'/user/consent', 'get'>);
};

export const getUserEmail = async (
  pathParams: ApiPathParams<'/user/email/{email}', 'get'>,
): Promise<ApiResult<'/user/email/{email}', 'get'>> => {
  return api
    .GET('/user/email/{email}', {
      params: { path: pathParams },
    })
    .then(handleApiResult<'/user/email/{email}', 'get'>)
    .catch(handleApiError<'/user/email/{email}', 'get'>);
};

export const getUserPasskey = async (): Promise<
  ApiResult<'/user/passkey', 'get'>
> => {
  return api
    .GET('/user/passkey')
    .then(handleApiResult<'/user/passkey', 'get'>)
    .catch(handleApiError<'/user/passkey', 'get'>);
};

export const patchUserPasskey = async (
  pathParams: ApiPathParams<'/user/passkey/{id}', 'patch'>,
  requestBody: ApiRequestBody<'/user/passkey/{id}', 'patch'>,
): Promise<ApiResult<'/user/passkey/{id}', 'patch'>> => {
  return api
    .PATCH('/user/passkey/{id}', {
      params: { path: pathParams },
      body: requestBody,
    })
    .then(handleApiResult<'/user/passkey/{id}', 'patch'>)
    .catch(handleApiError<'/user/passkey/{id}', 'patch'>);
};

export const patchUserPassword = async (
  requestBody: ApiRequestBody<'/user/password', 'patch'>,
): Promise<ApiResult<'/user/password', 'patch'>> => {
  return api
    .PATCH('/user/password', {
      body: requestBody,
    })
    .then(handleApiResult<'/user/password', 'patch'>)
    .catch(handleApiError<'/user/password', 'patch'>);
};

export const patchUserPicture = async (
  queryParams: ApiQueryParams<'/user/picture', 'patch'>,
): Promise<ApiResult<'/user/picture', 'patch'>> => {
  return api
    .PATCH('/user/picture', {
      params: { query: queryParams },
    })
    .then(handleApiResult<'/user/picture', 'patch'>)
    .catch(handleApiError<'/user/picture', 'patch'>);
};

export const postUser = async (
  requestBody: ApiRequestBody<'/user', 'post'>,
): Promise<ApiResult<'/user', 'post', 201>> => {
  const parsedPhoneNumber = parsePhoneNumber(requestBody.phoneNumber, 'KR');

  if (!parsedPhoneNumber) {
    throw new Error('Invalid phone number');
  }

  const modifiedRequestBody = {
    ...requestBody,
    phoneNumber: parsedPhoneNumber.number,
  };

  return api
    .POST('/user', {
      body: modifiedRequestBody,
    })
    .then(handleApiResult<'/user', 'post', 201>)
    .catch(handleApiError<'/user', 'post'>);
};

export const postUserPasskey = async (): Promise<
  ApiResult<'/user/passkey', 'post'>
> => {
  return api
    .POST('/user/passkey')
    .then(handleApiResult<'/user/passkey', 'post'>)
    .catch(handleApiError<'/user/passkey', 'post'>);
};

export const postUserPasskeyVerify = async (
  requestBody: ApiRequestBody<'/user/passkey/verify', 'post'>,
): Promise<ApiResult<'/user/passkey/verify', 'post'>> => {
  return api
    .POST('/user/passkey/verify', {
      body: requestBody,
    })
    .then(handleApiResult<'/user/passkey/verify', 'post'>)
    .catch(handleApiError<'/user/passkey/verify', 'post'>);
};

export const postUserPassword = async (
  requestBody: ApiRequestBody<'/user/password', 'post'>,
): Promise<ApiResult<'/user/password', 'post'>> => {
  return api
    .POST('/user/password', {
      body: requestBody,
    })
    .then(handleApiResult<'/user/password', 'post'>)
    .catch(handleApiError<'/user/password', 'post'>);
};

export const postUserVerifyStudentId = async (
  requestBody: ApiRequestBody<'/user/verify/studentId', 'post'>,
): Promise<ApiResult<'/user/verify/studentId', 'post'>> => {
  return api
    .POST('/user/verify/studentId', {
      body: requestBody,
    })
    .then(handleApiResult<'/user/verify/studentId', 'post'>)
    .catch(handleApiError<'/user/verify/studentId', 'post'>);
};
