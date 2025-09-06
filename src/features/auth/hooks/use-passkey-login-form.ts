import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { useAuth } from './use-auth';
import { useToken } from './use-token';

import { postAuthPasskey } from '@/data/post-auth-passkey';
import { postAuthPasskeyVerify } from '@/data/post-auth-passkey-verify';
import { useRecentLogin } from '@/features/oauth';

const createSchema = (t: TFunction) =>
  z.object({
    email: z.string().email(t('login.inputs.email.errors.format')),
  });

export type PasskeyLoginFormSchema = z.infer<ReturnType<typeof createSchema>>;

export const usePasskeyLoginForm = () => {
  const { t } = useTranslation();
  const { saveToken } = useToken();
  const form = useForm({
    resolver: zodResolver(createSchema(t)),
    mode: 'onChange',
  });
  const { refetch } = useAuth();
  const { setRecentLogin } = useRecentLogin();

  const onSubmit = form.handleSubmit(async (formData) => {
    try {
      // 1. 먼저 passkey challenge를 요청
      const { data: challengeData, status: challengeStatus } =
        await postAuthPasskey({
          email: formData.email,
        });

      if (!challengeData || challengeStatus) {
        switch (challengeStatus) {
          case 'EMAIL_NOT_FOUND':
            form.setError('email', { message: t('login.errors.unauthorized') });
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

      // 2. WebAuthn API를 사용해 인증 수행
      const credential = (await navigator.credentials.get({
        publicKey: {
          ...challengeData,
          challenge: Uint8Array.from(atob(challengeData.challenge), (c) =>
            c.charCodeAt(0),
          ),
          allowCredentials: challengeData.allowCredentials?.map((cred) => ({
            id: Uint8Array.from(atob(cred.id), (c) => c.charCodeAt(0)),
            type: 'public-key' as const,
            transports: cred.transports as AuthenticatorTransport[] | undefined,
          })),
        },
      })) as PublicKeyCredential | null;

      if (!credential) {
        form.setError('root', { message: t('login.errors.unauthorized') });
        return;
      }

      const response = credential.response as AuthenticatorAssertionResponse;

      // 3. 인증 결과를 서버에 전송
      const authenticationResponse: any = {
        id: credential.id,
        rawId: credential.id,
        type: credential.type,
        response: {
          authenticatorData: btoa(
            String.fromCharCode(...new Uint8Array(response.authenticatorData)),
          ),
          clientDataJSON: btoa(
            String.fromCharCode(...new Uint8Array(response.clientDataJSON)),
          ),
          signature: btoa(
            String.fromCharCode(...new Uint8Array(response.signature)),
          ),
        },
        clientExtensionResults: {},
      };

      if (response.userHandle) {
        authenticationResponse.response.userHandle = btoa(
          String.fromCharCode(...new Uint8Array(response.userHandle)),
        );
      }

      const { data: verifyData, status: verifyStatus } =
        await postAuthPasskeyVerify({
          email: formData.email,
          authenticationResponse,
        });

      if (!verifyData || verifyStatus) {
        switch (verifyStatus) {
          case 'INVALID_RESPONSE':
            form.setError('root', { message: t('login.errors.unauthorized') });
            break;
          case 'EMAIL_NOT_FOUND':
            form.setError('email', { message: t('login.errors.unauthorized') });
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

      // 4. 토큰 저장 및 로그인 완료
      saveToken(verifyData.accessToken);
      await refetch();
      setRecentLogin(new Date());
    } catch (error) {
      console.error('Passkey login error:', error);
      if (error instanceof Error && error.name === 'NotAllowedError') {
        form.setError('root', { message: t('login.errors.unauthorized') });
      } else {
        toast.error(t('toast.unknown_error'));
      }
    }
  });

  return { form, onSubmit };
};
