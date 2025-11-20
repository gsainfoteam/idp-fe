import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { postUserPasskey, postUserPasskeyVerify } from '@/data/user';
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

    const challengeRes = await postUserPasskey();

    if (!challengeRes.ok) {
      if (challengeRes.status === 404) {
        toast.error(t('toast.invalid_user'));
      } else if (challengeRes.status === 500) {
        toast.error(t('toast.server_error'));
      } else {
        toast.error(t('toast.unknown_error'));
      }

      return;
    }

    const challengeData = challengeRes.data;

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

    const verifyRes = await postUserPasskeyVerify({
      name: aaguidInfo.name,
      icon: aaguidInfo.icon_dark,
      registrationResponse: {
        id: credential.id,
        rawId: arrayBufferToBase64Url(credential.rawId),
        type: type,
        response: {
          clientDataJSON: arrayBufferToBase64Url(response.clientDataJSON),
          attestationObject: arrayBufferToBase64Url(response.attestationObject),
        },
        clientExtensionResults: credential.getClientExtensionResults(),
      },
    });

    if (!verifyRes.ok) {
      if (verifyRes.status === 401) {
        toast.error(t('passkey.steps.register.errors.invalid_response'));
      } else if (verifyRes.status === 404) {
        toast.error(t('toast.invalid_user'));
      } else if (verifyRes.status === 409) {
        toast.error(t('passkey.steps.register.errors.credential_id_conflict'));
      } else if (verifyRes.status === 500) {
        toast.error(t('toast.server_error'));
      } else {
        toast.error(t('toast.unknown_error'));
      }
      return;
    }

    onNext();
  };

  return { onSubmit };
};
