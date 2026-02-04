export const TERMS_VERSION_URL = 'https://terms.gistory.me/account/index.json';

export type TermsVersionResponse = {
  service: 'account';
  privacy: string;
  tos: string;
};

function isTermsVersionResponse(value: unknown): value is TermsVersionResponse {
  if (typeof value !== 'object' || value === null) return false;

  const v = value as Record<string, unknown>;

  return (
    v.service === 'account' &&
    typeof v.privacy === 'string' &&
    typeof v.tos === 'string'
  );
}

export async function fetchTermsVersion(): Promise<TermsVersionResponse> {
  const res = await fetch(TERMS_VERSION_URL, { method: 'GET' });
  if (!res.ok) throw new Error(`Failed to fetch terms version: ${res.status}`);

  const json = (await res.json()) as unknown;
  if (!isTermsVersionResponse(json)) {
    throw new Error('Invalid terms version response');
  }

  return json;
}

export type TermsDocType = 'terms' | 'privacy';

export type EmbeddedTermsUrls = Record<TermsDocType, string>;

export function buildEmbeddedTermsUrl({
  type,
  privacyVersion,
  tosVersion,
}: {
  type: TermsDocType;
  privacyVersion: string;
  tosVersion: string;
}) {
  const version = type === 'terms' ? tosVersion : privacyVersion;
  const path = type === 'terms' ? 'tos' : 'privacy';
  return `https://terms.gistory.me/embedded/account/${path}/${version}/`;
}
