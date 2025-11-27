import * as CBOR from 'cbor-js';

import aaguids from '@/assets/aaguid.json';

/**
 * AAGUID는 인증자의 모델을 식별하는 고유한 번호
 * @link https://web.dev/articles/webauthn-aaguid?hl=ko
 *
 * AAGUID 목록: https://github.com/passkeydeveloper/passkey-authenticator-aaguids/blob/main/aaguid.json
 */
export function getAAGUID(attestationObject: ArrayBuffer): string | undefined {
  const decoded = CBOR.decode(attestationObject);

  if (decoded && decoded.authData) {
    const authDataBuffer = new Uint8Array(decoded.authData);

    if (authDataBuffer.length >= 53) {
      const aaguidBytes = authDataBuffer.slice(37, 53);
      const aaguidHex = Array.from(aaguidBytes)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');

      const aaguid = [
        aaguidHex.slice(0, 8),
        aaguidHex.slice(8, 12),
        aaguidHex.slice(12, 16),
        aaguidHex.slice(16, 20),
        aaguidHex.slice(20, 32),
      ].join('-');

      return aaguid;
    }
  }

  return undefined;
}

function aaguidGuard(aaguid: string): aaguid is keyof typeof aaguids {
  return aaguid in aaguids;
}

export type AAGUIDInfo = {
  name: string;
  icon_dark?: string;
  icon_light?: string;
};

export function getAAGUIDInfo(aaguid: string): AAGUIDInfo | undefined {
  if (aaguidGuard(aaguid)) {
    return aaguids[aaguid];
  } else if (aaguid === '00000000-0000-0000-0000-000000000000') {
    return {
      name: 'Platform Authenticator',
    };
  } else {
    return undefined;
  }
}
