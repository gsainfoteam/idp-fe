export const detectPasswordManager = (): string => {
  const userAgent = navigator.userAgent;

  if (userAgent.includes('Chrome') || userAgent.includes('Edg')) {
    return 'Chrome';
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    return 'Safari';
  } else if (userAgent.includes('Firefox')) {
    return 'Firefox';
  } else if ((window as any)._onepasswordExtension) {
    return '1Password';
  } else if ((window as any).BitwardenBrowser) {
    return 'Bitwarden';
  } else {
    return 'Passkey';
  }
};

export const generatePasskeyName = (managerName: string): string => {
  const deviceInfo = navigator.platform || 'Unknown Device';
  return `${managerName} - ${deviceInfo}`;
};
