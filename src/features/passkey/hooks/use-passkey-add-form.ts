import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { postUserPasskey } from '@/data/post-user-passkey';
import { postUserPasskeyVerify } from '@/data/post-user-passkey-verify';
import { useAuth } from '@/features/auth';
import {
  arrayBufferToBase64Url,
  base64UrlToArrayBuffer,
  credentialTypeGuard,
  getAAGUID,
  getAAGUIDInfo,
} from '@/features/passkey';

export const usePasskeyAddForm = ({ onNext }: { onNext: () => void }) => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const onSubmit = async () => {
    if (!user) {
      toast.error(t('toast.invalid_user'));
      return;
    }

    if (!navigator.credentials) {
      toast.error(t('passkey.steps.register.errors.not_supported'));
      return;
    }

    const { data: challengeData, status: challengeStatus } =
      await postUserPasskey();

    if (!challengeData || challengeStatus) {
      switch (challengeStatus) {
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

    const publicKey: PublicKeyCredentialCreationOptions = {
      ...challengeData,
      challenge: base64UrlToArrayBuffer(challengeData.challenge),
      user: {
        ...challengeData.user,
        id: base64UrlToArrayBuffer(challengeData.user.id),
      },
      excludeCredentials: challengeData.excludeCredentials?.map(
        (cred) =>
          ({
            ...cred,
            id: base64UrlToArrayBuffer(cred.id),
          }) as PublicKeyCredentialDescriptor,
      ),
    };

    let credential: PublicKeyCredential | null = null;
    try {
      credential = (await navigator.credentials.create({
        publicKey,
      })) as PublicKeyCredential | null;
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : t('passkey.steps.register.errors.failed'),
      );
      return;
    }

    if (!credential) {
      toast.error(t('passkey.steps.register.errors.failed'));
      return;
    }

    const response = credential.response as AuthenticatorAttestationResponse;
    const type = credential.type;
    if (!credentialTypeGuard(type)) {
      toast.error(t('passkey.steps.register.errors.invalid_response'));
      return;
    }

    const aaguid = getAAGUID(response.attestationObject);
    if (!aaguid) {
      toast.error(t('passkey.steps.register.errors.unknown_aaguid'));
      return;
    }

    const aaguidInfo = getAAGUIDInfo(aaguid);
    if (!aaguidInfo) {
      toast.error(
        t('passkey.steps.register.errors.invalid_aaguid', { aaguid }),
      );
      return;
    }

    const { data: verifyData, status: verifyStatus } =
      await postUserPasskeyVerify({
        name: aaguidInfo.name,
        icon: aaguidInfo.icon_dark,
        registrationResponse: {
          id: credential.id,
          rawId: arrayBufferToBase64Url(credential.rawId),
          type: type,
          response: {
            clientDataJSON: arrayBufferToBase64Url(response.clientDataJSON),
            attestationObject: arrayBufferToBase64Url(
              response.attestationObject,
            ),
          },
          clientExtensionResults: credential.getClientExtensionResults(),
        },
      });

    if (!verifyData || verifyStatus) {
      switch (verifyStatus) {
        case 'INVALID_RESPONSE':
          toast.error(t('passkey.steps.register.errors.invalid_response'));
          break;
        case 'EMAIL_NOT_FOUND':
          toast.error(t('toast.invalid_user'));
          break;
        case 'CREDENTIAL_ID_CONFLICT':
          toast.error(
            t('passkey.steps.register.errors.credential_id_conflict'),
          );
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

    onNext();
  };

  return { onSubmit };
};
