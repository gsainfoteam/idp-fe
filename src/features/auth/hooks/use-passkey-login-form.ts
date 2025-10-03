import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { postAuthPasskey } from '@/data/post-auth-passkey';
import { postAuthPasskeyVerify } from '@/data/post-auth-passkey-verify';
import { useRecentLogin } from '@/features/oauth';
import {
  arrayBufferToBase64Url,
  base64UrlToArrayBuffer,
  credentialTypeGuard,
} from '@/features/passkey';

import { useAuth } from './use-auth';
import { useToken } from './use-token';

export const usePasskeyLoginForm = () => {
  const { t } = useTranslation();
  const { saveToken } = useToken();
  const { refetch } = useAuth();
  const { setRecentLogin } = useRecentLogin();

  const onSubmit = async () => {
    if (!navigator.credentials) {
      toast.error(t('login.errors.passkey_not_supported'));
      return;
    }

    const { data: challengeData, status: challengeStatus } =
      await postAuthPasskey();

    if (!challengeData || challengeStatus) {
      switch (challengeStatus) {
        case 'EMAIL_NOT_FOUND':
          toast.error(t('login.errors.unauthorized'));
          break;
        case 'SERVER_ERROR':
          toast.error(t('toast.server_error'));
          break;
        case 'UNKNOWN_ERROR':
          toast.error(t('toast.unknown_error'));
          break;
      }
      return;
    }

    const publicKey: PublicKeyCredentialRequestOptions = {
      ...challengeData,
      challenge: base64UrlToArrayBuffer(challengeData.challenge),
      allowCredentials: challengeData.allowCredentials?.map(
        (cred) =>
          ({
            ...cred,
            id: base64UrlToArrayBuffer(cred.id),
          }) as PublicKeyCredentialDescriptor,
      ),
    };

    const credential = (await navigator.credentials.get({
      publicKey,
    })) as PublicKeyCredential | null;

    if (!credential) {
      toast.error(t('login.errors.unauthorized'));
      return;
    }

    const response = credential.response as AuthenticatorAssertionResponse;
    const type = credential.type;
    if (!credentialTypeGuard(type)) {
      toast.error(t('login.errors.unauthorized'));
      return;
    }

    const { data: verifyData, status: verifyStatus } =
      await postAuthPasskeyVerify({
        key: challengeData.key,
        authenticationResponse: {
          id: credential.id,
          rawId: arrayBufferToBase64Url(credential.rawId),
          type: type,
          response: {
            clientDataJSON: arrayBufferToBase64Url(response.clientDataJSON),
            authenticatorData: arrayBufferToBase64Url(
              response.authenticatorData,
            ),
            signature: arrayBufferToBase64Url(response.signature),
            userHandle: response.userHandle
              ? arrayBufferToBase64Url(response.userHandle)
              : undefined,
          },
          clientExtensionResults: credential.getClientExtensionResults(),
        },
      });

    if (!verifyData || verifyStatus) {
      switch (verifyStatus) {
        case 'INVALID_RESPONSE':
          toast.error(t('login.errors.unauthorized'));
          break;
        case 'EMAIL_NOT_FOUND':
          toast.error(t('toast.invalid_user'));
          break;
        case 'SERVER_ERROR':
          toast.error(t('toast.server_error'));
          break;
        case 'UNKNOWN_ERROR':
          toast.error(t('toast.unknown_error'));
          break;
      }
      return;
    }

    saveToken(verifyData.accessToken);
    await refetch();
    setRecentLogin(new Date());
  };

  return { onSubmit };
};
