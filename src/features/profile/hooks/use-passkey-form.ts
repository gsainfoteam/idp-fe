import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';

import { postUserPasskey } from '@/data/post-user-passkey';
import { postUserPasskeyVerify } from '@/data/post-user-passkey-verify';
import { useAuth } from '@/features/auth';

// Base64URL을 Base64로 변환하는 헬퍼 함수
const base64UrlToBase64 = (base64url: string): string => {
  return base64url
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .padEnd(base64url.length + ((4 - (base64url.length % 4)) % 4), '=');
};

// Base64URL을 Uint8Array로 변환하는 헬퍼 함수
const base64UrlToUint8Array = (base64url: string): Uint8Array => {
  const base64 = base64UrlToBase64(base64url);
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
};

// Uint8Array를 Base64URL로 변환하는 헬퍼 함수
const uint8ArrayToBase64Url = (array: Uint8Array): string => {
  const base64 = btoa(String.fromCharCode(...array));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

export const usePasskeyForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const form = useForm({
    mode: 'onChange',
  });

  const onSubmit = form.handleSubmit(async () => {
    if (!user) {
      toast.error(t('toast.invalid_user'));
      return;
    }

    try {
      // WebAuthn 지원 확인
      if (!navigator.credentials) {
        toast.error(t('passkey.errors.not_supported'));
        return;
      }

      // 1. 패스키 등록을 위한 challenge 요청
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

      console.log('Challenge data received:', challengeData); // 디버깅용
      console.log('Current hostname:', window.location.hostname); // 현재 도메인 확인

      // 2. WebAuthn API를 사용해 패스키 생성
      const challengeDataAny = challengeData as any;
      const publicKeyOptions = {
        ...challengeDataAny,
        challenge: base64UrlToUint8Array(challengeDataAny.challenge),
        user: challengeDataAny.user
          ? {
              ...challengeDataAny.user,
              id: base64UrlToUint8Array(challengeDataAny.user.id),
            }
          : challengeDataAny.user,
        excludeCredentials: challengeDataAny.excludeCredentials?.map(
          (cred: any) => ({
            ...cred,
            id: base64UrlToUint8Array(cred.id),
            transports: cred.transports as AuthenticatorTransport[] | undefined,
          }),
        ),
      };

      // rpId 문제를 해결하기 위해 rp 객체 수정
      if (publicKeyOptions.rp) {
        // 개발환경에서는 rp.id를 현재 도메인으로 설정하거나 제거
        if (
          window.location.hostname === 'localhost' ||
          window.location.hostname.includes('127.0.0.1') ||
          window.location.hostname.includes('dev') ||
          window.location.hostname.includes('staging')
        ) {
          // 개발/스테이징 환경에서는 rp.id 제거
          delete publicKeyOptions.rp.id;
        } else {
          publicKeyOptions.rp.id = window.location.hostname;
        }
      }

      // 만약 여전히 문제가 있다면 rp 객체 전체를 단순화
      publicKeyOptions.rp = {
        name: publicKeyOptions.rp?.name || 'idp',
        // id는 설정하지 않음 (브라우저가 자동으로 현재 도메인 사용)
      };

      console.log('Final publicKey options:', publicKeyOptions); // 디버깅용

      const credential = (await navigator.credentials.create({
        publicKey: publicKeyOptions,
      })) as PublicKeyCredential | null;

      if (!credential) {
        toast.error(t('passkey.errors.cancelled'));
        return;
      }

      const response = credential.response as AuthenticatorAttestationResponse;

      // 3. 등록 결과를 서버에 전송
      const registrationResponse = {
        id: credential.id,
        rawId: credential.id,
        type: credential.type,
        response: {
          clientDataJSON: uint8ArrayToBase64Url(
            new Uint8Array(response.clientDataJSON),
          ),
          attestationObject: uint8ArrayToBase64Url(
            new Uint8Array(response.attestationObject),
          ),
        },
        clientExtensionResults: {},
      };

      const { data: verifyData, status: verifyStatus } =
        await postUserPasskeyVerify({
          email: user.email,
          registrationResponse,
        });

      if (!verifyData || verifyStatus) {
        switch (verifyStatus) {
          case 'INVALID_RESPONSE':
            toast.error(t('passkey.errors.invalid_response'));
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

      // 4. 성공 처리
      toast.success(t('passkey.success'));
      navigate({ to: '/' });
    } catch (error) {
      console.error('Passkey registration error:', error);
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          toast.error(t('passkey.errors.cancelled'));
        } else if (error.name === 'NotSupportedError') {
          toast.error(t('passkey.errors.not_supported'));
        } else {
          toast.error(t('passkey.errors.failed'));
        }
      } else {
        toast.error(t('toast.unknown_error'));
      }
    }
  });

  return { form, onSubmit };
};
