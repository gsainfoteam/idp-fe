const ONLY_HANGUL = /^[가-힣]+$/;

export const isKoreanName = (name: string) =>
  ONLY_HANGUL.test(name.replace(/\s/g, ''));
