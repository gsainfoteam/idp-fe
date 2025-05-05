import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { getUserConsent } from '@/data/get-user-consent';
import { AuthorizeFrame } from '@/features/oauth';

export const ClientScopeEnum = z.enum([
  'profile',
  'email',
  'phone_number',
  'student_id',
]);
export type ClientScopeType = z.infer<typeof ClientScopeEnum>;

export const TokenScopeEnum = z.enum(['openid', 'offline_access']);
export type TokenScopeType = z.infer<typeof TokenScopeEnum>;

export const ScopeEnum = ClientScopeEnum.or(TokenScopeEnum);
export type ScopeType = z.infer<typeof ScopeEnum>;

export const ResponseEnum = z.enum(['token', 'id_token', 'code']);

const schema = z.object({
  client_id: z.string(),
  redirect_uri: z.string().url(),
  state: z.string().optional(),
  scope: z
    .string()
    .transform((scope) => scope.split(' ').flatMap((s) => s.split('+')))
    .pipe(z.array(ScopeEnum))
    .transform((s) => s.join(' ')),
  nonce: z.string().optional(),
  response_type: z.string().refine((v) => v === 'code'),
  prompt: z.enum(['none', 'login', 'consent']).optional(),
  code_challenge: z.string(),
  code_challenge_method: z.enum(['S256', 'plain']),
});

const validateSchema = schema
  .transform(({ scope, client_id, redirect_uri, response_type, ...rest }) => ({
    scopes: z.array(ScopeEnum).parse(scope.split(' ')),
    clientId: client_id,
    redirectUri: redirect_uri,
    responseTypes: z.array(ResponseEnum).parse(response_type.split(' ')),
    url: new URL(redirect_uri),
    ...rest,
  }))
  .transform((rest) => ({
    clientScopes: ClientScopeEnum.options.filter((v) =>
      rest.scopes.includes(v),
    ),
    tokenScopes: TokenScopeEnum.options.filter((v) => rest.scopes.includes(v)),
    ...rest,
  }))
  .refine(
    ({ scopes, prompt }) =>
      !scopes.includes('offline_access') ||
      prompt === 'consent' ||
      prompt === 'login',
    {
      message: 'offline_access scope requires consent or login prompt',
      path: ['prompt'],
    },
  )
  .refine(({ nonce, scopes }) => !scopes.includes('openid') || nonce, {
    message: 'nonce is required for id_token',
    path: ['nonce'],
  })
  .refine(({ nonce, scopes }) => scopes.includes('openid') || !nonce, {
    message: 'nonce is not required for non-id_token',
    path: ['nonce'],
  });

const AuthorizePage = () => {
  return <AuthorizeFrame />;
};

export const Route = createFileRoute('/_auth-required/authorize')({
  component: AuthorizePage,
  validateSearch: schema,
  loaderDeps: ({ search }) => search,
  loader: async ({ deps }) => ({
    ...validateSchema.parse(deps),
    consents: await getUserConsent(),
  }),
});
