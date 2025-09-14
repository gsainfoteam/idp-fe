import { useState } from 'react';
import { RegularLoginFrame } from './regular-login-frame';
import { PasskeyLoginFrame } from './passkey-login-frame';

export function LoginFrame() {
  const [isPasskeyMode, setIsPasskeyMode] = useState(false);

  return isPasskeyMode ? (
    <PasskeyLoginFrame changeMode={() => setIsPasskeyMode(false)} />
  ) : (
    <RegularLoginFrame changeMode={() => setIsPasskeyMode(true)} />
  );
}
