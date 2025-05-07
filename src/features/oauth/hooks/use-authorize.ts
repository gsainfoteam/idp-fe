import { useLoaderData, useSearch } from '@tanstack/react-router';
import { useCallback, useEffect } from 'react';

import { useAuthorizeForm } from './use-authorize-form';
import { useRecentLogin } from './use-recent-login';

import { components } from '@/@types/api-schema';
import { useAuth } from '@/features/auth';
import { ClientScopeType } from '@/routes/_auth-required/authorize';

export const useAuthorize = ({
  client,
}: {
  client: components['schemas']['ClientPublicResDto'];
}) => {
  const { recentLogin } = useRecentLogin();
  const { user, signOut } = useAuth();
  const { clientId, clientScopes, tokenScopes, consents, url, state } =
    useLoaderData({
      from: '/_auth-required/authorize',
    });
  const { prompt, ...search } = useSearch({
    from: '/_auth-required/authorize',
  });

  const redirect = useCallback(
    (params: { error?: string; error_description?: string }) => {
      const searchParams = new URLSearchParams();
      Object.entries(params)
        .filter(([, value]) => value !== undefined)
        .forEach(([key, value]) => searchParams.append(key, value));
      if (state) searchParams.append('state', state);

      const newUrl = new URL(url);
      newUrl.search = searchParams.toString();
      window.location.href = newUrl.toString();
    },
    [url, state],
  );

  const authorize = useCallback(
    (agreed: ClientScopeType[]) => {
      const query = new URLSearchParams(search);
      query.set('scope', [...tokenScopes, ...agreed].join(' '));
      window.location.href = `${import.meta.env.VITE_API_URL}/oauth/authorize?${query.toString()}`;
    },
    [search, tokenScopes],
  );

  useEffect(() => {
    const consentedClient = consents.data?.list.find(
      (c) => c.clientUuid === clientId,
    );
    const requiredScopes = clientScopes.filter((v) =>
      client.scopes.includes(v),
    );
    const consented = consentedClient
      ? requiredScopes.every((s) => consentedClient.scopes.includes(s))
      : false;

    const consentedScopes =
      (consentedClient?.scopes as ClientScopeType[]) ?? [];

    if (prompt === 'none') {
      if (!user)
        // NOTE: never happens, but just in case
        return redirect({
          error: 'access_denied',
          error_description: 'login_required',
        });
      if (!consented)
        return redirect({
          error: 'access_denied',
          error_description: 'consent_required',
        });
      if (tokenScopes.includes('offline_access'))
        return redirect({
          error: 'access_denied',
          error_description: 'consent_required',
        });
      return authorize(consentedScopes);
    }

    if (prompt === 'login') {
      if (!recentLogin) return void signOut();
      return; // show consent screen
    }

    if (prompt === 'consent') return; // show consent screen

    if (consented) {
      if (tokenScopes.includes('offline_access')) return;
      return authorize(consentedScopes);
    }
  }, [
    authorize,
    client.scopes,
    clientId,
    clientScopes,
    consents.data?.list,
    prompt,
    recentLogin,
    redirect,
    signOut,
    state,
    tokenScopes,
    url,
    user,
  ]);

  return useAuthorizeForm({
    clientId: client.clientId,
    onDone: authorize,
  });
};
