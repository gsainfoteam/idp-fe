import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { postUserPasskey } from '@/data/post-user-passkey';
import { postUserPasskeyVerify } from '@/data/post-user-passkey-verify';
import { useAuth } from '@/features/auth';
import {
  arrayBufferToBase64Url,
  base64UrlToArrayBuffer,
  credentialTypeGuard,
} from '@/features/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import z from 'zod';

// TODO: 비밀번호 관리자 이름 자동으로 채우기 구현 시도해보기

const createSchema = (t: TFunction) =>
  z.object({
    name: z
      .string()
      .min(1, { message: t('passkey.steps.register.name.errors.format') })
      .max(50, { message: t('passkey.steps.register.name.errors.max_length') }),
  });

export type PasskeyFormSchema = z.infer<ReturnType<typeof createSchema>>;

export const usePasskeyForm = ({ onNext }: { onNext: () => void }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const form = useForm<PasskeyFormSchema>({
    resolver: zodResolver(createSchema(t)),
    mode: 'onChange',
  });

  const onSubmit = form.handleSubmit(async (formData) => {
    if (!user) {
      toast.error(t('toast.invalid_user'));
      return;
    }

    if (!navigator.credentials) {
      toast.error(t('passkey.steps.register.errors.not_supported'));
      return;
    }

    const { data: challengeData, status: challengeStatus } =
      await postUserPasskey({
        email: user.email,
      });

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

    const credential = (await navigator.credentials.create({
      publicKey,
    })) as PublicKeyCredential | null;

    if (!credential) {
      toast.error(t('passkey.steps.register.errors.cancelled'));
      return;
    }

    const response = credential.response as AuthenticatorAttestationResponse;
    const type = credential.type;
    if (!credentialTypeGuard(type)) {
      toast.error(t('passkey.steps.register.errors.invalid_response'));
      return;
    }

    const { data: verifyData, status: verifyStatus } =
      await postUserPasskeyVerify({
        name: formData.name,
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
  });

  return { form, onSubmit };
};
