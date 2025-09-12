import { useTranslation } from 'react-i18next';
import KeyIcon from '@/assets/icons/line/key.svg?react';
import WindowsHelloIcon from '@/assets/icons/line/windows-hello.svg?react';
import FaceIDIcon from '@/assets/icons/line/face-id.svg?react';
import FingerprintIcon from '@/assets/icons/line/fingerprint.svg?react';
import { UAParser } from 'ua-parser-js';

export function getOsVariant() {
  const { os, device } = UAParser(navigator.userAgent);
  const [prefixIcon, buttonText] = getVariant(
    os.name?.toLowerCase() ?? '',
    device.type ?? '',
  );

  return { prefixIcon, buttonText };
}

export function getVariant(
  os: string,
  device: string,
): [React.ReactNode, string] {
  const { t } = useTranslation();

  if (os.startsWith('windows')) {
    return [<WindowsHelloIcon />, t('login.buttons.login_with_windows_hello')];
  } else if (os.startsWith('ios')) {
    return [<FaceIDIcon />, t('login.buttons.login_with_face_id')];
  } else if (os.startsWith('macos')) {
    return [<FingerprintIcon />, t('login.buttons.login_with_touch_id')];
  } else if (device === 'mobile') {
    return [<FingerprintIcon />, t('login.buttons.login_with_biometric')];
  } else {
    return [<KeyIcon />, t('login.buttons.login_with_passkey')];
  }
}
