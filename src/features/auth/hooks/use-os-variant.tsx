import { useTranslation } from 'react-i18next';
import KeyIcon from '@/assets/icons/line/key.svg?react';
import WindowsHelloIcon from '@/assets/icons/line/windows-hello.svg?react';
import FaceIDIcon from '@/assets/icons/line/face-id.svg?react';
import FingerprintIcon from '@/assets/icons/line/fingerprint.svg?react';
import { UAParser } from 'ua-parser-js';

export function useOsVariant() {
  const { t } = useTranslation();
  const { os, device } = UAParser(navigator.userAgent);
  const osName = os.name?.toLowerCase() ?? '';
  const deviceType = device.type ?? '';

  if (osName.startsWith('windows')) {
    return {
      prefixIcon: <WindowsHelloIcon />,
      buttonText: t('login.buttons.login_with_windows_hello'),
    };
  } else if (osName.startsWith('ios')) {
    return {
      prefixIcon: <FaceIDIcon />,
      buttonText: t('login.buttons.login_with_face_id'),
    };
  } else if (osName.startsWith('macos')) {
    return {
      prefixIcon: <FingerprintIcon />,
      buttonText: t('login.buttons.login_with_touch_id'),
    };
  } else if (deviceType === 'mobile') {
    return {
      prefixIcon: <FingerprintIcon />,
      buttonText: t('login.buttons.login_with_biometric'),
    };
  } else {
    return {
      prefixIcon: <KeyIcon />,
      buttonText: t('login.buttons.login_with_passkey'),
    };
  }
}
