import { CSSProperties } from 'react';

export type TypographyVariants =
  | 'title1'
  | 'title2'
  | 'title3'
  | 'body1'
  | 'body2'
  | 'label1'
  | 'label2';

type TypoProps = { variant: TypographyVariants };

const typographyStyles: {
  [key in TypographyVariants]: CSSProperties;
} = {
  title1: {
    fontSize: '22px',
    fontWeight: 700,
    lineHeight: '150%',
  },
  title2: {
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '150%',
  },
  title3: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '150%',
  },
  body1: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '150%',
  },
  body2: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '140%',
  },
  label1: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '120%',
  },
  label2: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '120%',
  },
};

export function Typo({
  variant,
  children,
  ...props
}: TypoProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} style={typographyStyles[variant]}>
      {children}
    </div>
  );
}
