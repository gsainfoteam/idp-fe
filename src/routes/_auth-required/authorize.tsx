import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { AuthorizeFrame } from '@/features/oauth';

export const ClientScopeEnum = z.enum([
  'profile',
  'name',
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

const schema = z
  .object({
    client_id: z.string(),
    redirect_uri: z.string().url(),
    state: z.string().optional(),
    scope: z
      .string()
      .transform((scope) => scope.split(' '))
      .pipe(z.array(ScopeEnum))
      .superRefine((scopes, ctx) => {
        if (!scopes.includes('openid')) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'openid scope is required',
            fatal: true,
          });
          return z.never();
        }
      }),
    nonce: z.string().optional(),
    response_type: z
      .string()
      .transform((responseType) => responseType.split(' '))
      .pipe(z.array(ResponseEnum)),
    prompt: z.enum(['none', 'login', 'consent']).optional(),
  })
  .transform(({ scope, client_id, redirect_uri, response_type, ...rest }) => ({
    scopes: scope,
    clientId: client_id,
    redirectUri: redirect_uri,
    responseTypes: response_type,
    url: new URL(redirect_uri),
    useImplicitFlow: (['token', 'id_token'] as const).some((type) =>
      response_type.includes(type),
    ),
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
  .refine(
    ({ scopes, responseTypes }) =>
      !scopes.includes('offline_access') || responseTypes.includes('code'),
    {
      message: 'offline_access scope requires code response type',
      path: ['response_type'],
    },
  )
  .refine(
    ({ nonce, responseTypes }) => !responseTypes.includes('id_token') || nonce,
    {
      message: 'nonce is required for id_token response type',
      path: ['nonce'],
    },
  )
  .refine(
    ({ nonce, responseTypes }) => responseTypes.includes('id_token') || !nonce,
    {
      message: 'nonce is not required for non-id_token response type',
      path: ['nonce'],
    },
  );

const AuthorizePage = () => {
  return <AuthorizeFrame />;
};

export const Route = createFileRoute('/_auth-required/authorize')({
  component: AuthorizePage,
  validateSearch: schema,
});
