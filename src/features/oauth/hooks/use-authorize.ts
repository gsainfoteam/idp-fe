import { useLoaderData, useSearch } from '@tanstack/react-router';
import { useCallback, useEffect } from 'react';

import { useRecentLogin } from './use-recent-login';

import { components } from '@/@types/api-schema';
import { useAuth } from '@/features/auth';

export const useAuthorize = ({
  authorize,
  client,
}: {
  authorize: () => void;

  client: components['schemas']['ClientPublicResDto'];
}) => {
  const { recentLogin } = useRecentLogin();
  const { user, signOut } = useAuth();
  const { clientId, scopes, consents, url, state } = useLoaderData({
    from: '/_auth-required/authorize',
  });
  const { prompt } = useSearch({
    from: '/_auth-required/authorize',
  });

  const redirect = useCallback(
    (params: { error?: string; error_description?: string }) => {
      const searchParams = new URLSearchParams();
      Object.entries(params)
        .filter(([, value]) => value !== undefined)
        .forEach(([key, value]) => searchParams.append(key, value as string));
      if (state) searchParams.append('state', state);
      const newUrl = new URL(url);
      newUrl.search = searchParams.toString();
      window.location.href = newUrl.toString();
    },
    [url, state],
  );

  useEffect(() => {
    const consentedClient = consents.data?.list.find(
      (c) => c.clientUuid === clientId,
    );
    const requiredScopes = scopes.filter((v) => client.scopes.includes(v));
    const consented = consentedClient
      ? requiredScopes.every((s) => consentedClient.scopes.includes(s))
      : false;

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
      if (scopes.includes('offline_access'))
        return redirect({
          error: 'access_denied',
          error_description: 'consent_required',
        });
      return authorize();
    }

    if (prompt === 'login') {
      if (!recentLogin) return void signOut();
      return; // show consent screen
    }

    if (prompt === 'consent') return; // show consent screen

    if (consented) {
      if (scopes.includes('offline_access')) return;
      return authorize();
    }
  }, [
    authorize,
    client.scopes,
    clientId,
    consents.data?.list,
    prompt,
    recentLogin,
    redirect,
    scopes,
    signOut,
    state,
    url,
    user,
  ]);
};
