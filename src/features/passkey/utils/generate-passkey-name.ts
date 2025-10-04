import { UAParser } from 'ua-parser-js';

export const generatePasskeyName = (): string => {
  const parser = new UAParser(navigator.userAgent);
  const browser = parser.getBrowser();
  const browserName = browser.name || 'Unknown Browser';

  if ((window as any)._onepasswordExtension) {
    return `1Password - ${browserName}`;
  } else if ((window as any).BitwardenBrowser) {
    return `Bitwarden - ${browserName}`;
  } else {
    return browserName;
  }
};
