import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  buildEmbeddedTermsUrl,
  type EmbeddedTermsUrls,
  fetchTermsVersion,
} from '../../utils';

import { Log, useLoading } from '@/features/core';

const createSchema = () =>
  z.object({
    terms: z.boolean().default(false),
    privacy: z.boolean().default(false),
  });

export type AgreeFormSchema = z.infer<ReturnType<typeof createSchema>>;

const FALLBACK_PRIVACY_VERSION = '260201';
const FALLBACK_TOS_VERSION = '260201';

export const useAgreeForm = ({ onNext }: { onNext: () => void }) => {
  const form = useForm({
    resolver: zodResolver(createSchema()),
    mode: 'onChange',
  });

  const [termsVersion, setTermsVersion] = useState(() => ({
    privacy: FALLBACK_PRIVACY_VERSION,
    tos: FALLBACK_TOS_VERSION,
  }));
  const [isTermsVersionLoading, startTermsVersionLoading] = useLoading(true);

  useEffect(() => {
    let cancelled = false;

    startTermsVersionLoading(fetchTermsVersion())
      .then((version) => {
        if (cancelled) return;
        setTermsVersion({ privacy: version.privacy, tos: version.tos });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [startTermsVersionLoading]);

  const embeddedUrls: EmbeddedTermsUrls = useMemo(
    () => ({
      terms: buildEmbeddedTermsUrl({
        type: 'terms',
        privacyVersion: termsVersion.privacy,
        tosVersion: termsVersion.tos,
      }),
      privacy: buildEmbeddedTermsUrl({
        type: 'privacy',
        privacyVersion: termsVersion.privacy,
        tosVersion: termsVersion.tos,
      }),
    }),
    [termsVersion.privacy, termsVersion.tos],
  );

  const onSubmit = form.handleSubmit(async () => {
    Log.submit('auth_register_agree');
    onNext();
  });

  return {
    form,
    onSubmit,
    embeddedUrls,
    isTermsVersionLoading,
  };
};
