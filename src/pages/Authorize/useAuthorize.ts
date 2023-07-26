import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useHref,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "src/api/auth";
import { authorize, getClientInformation } from "src/api/oauth";
import {
  authorizeSchema,
  isConsentRequiredScope,
  isNotConsentRequiredScope,
} from "src/utils/schema";
import useSWR from "swr";
import { z } from "zod";
import { zx } from "zodix";

const useParams = () => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<z.infer<typeof authorizeSchema>>();
  const [error, setError] = useState<string>();
  useEffect(() => {
    const result = zx.parseQuerySafe(searchParams, authorizeSchema);
    if (result.success) {
      setData(result.data);
      setError(undefined);
    } else {
      setData(undefined);
      const error = result.error.flatten();
      setError(
        error.formErrors.length > 0
          ? error.formErrors.join(", ")
          : Object.entries(error.fieldErrors)
              .map(([k, v]) => `${k}: ${v}`)
              .join(", "),
      );
    }
  }, [searchParams]);
  return { data, error };
};

const useAuthorize = () => {
  const { t } = useTranslation();
  const { data: paramsData, error: paramsError } = useParams();
  const { data: clientData } = useSWR(
    paramsData ? ["client", paramsData.clientId] : undefined,
    ([, id]) => getClientInformation(id),
  );
  const href = useHref(useLocation());
  const { user } = useAuth({
    redirectUrl: {
      pathname: "/login",
      search: new URLSearchParams({ redirect: href }).toString(),
    },
  });
  const navigate = useNavigate();
  const [error, setError] = useState<string>();
  const [scopesConsented, setScopesConsented] = useState<string[]>([]);
  const [scopesNotConsented, setScopesNotConsented] = useState<string[]>([]);

  const consent = (scopes: string[]) => {
    setScopesConsented((prev) => [...prev, ...scopes]);
    setScopesNotConsented([]);
  };

  useEffect(() => {
    if (!user || !paramsData || !clientData) return;
    const { scopes, ...data } = paramsData;
    if (scopesConsented.length === 0) {
      if (data.prompt === "login" && clientData.recentConsent) {
        setScopesConsented(clientData.recentConsent);
        return;
      }
      setScopesConsented(scopes.filter(isNotConsentRequiredScope));
      setScopesNotConsented(scopes.filter(isConsentRequiredScope));
      return;
    }
    if (scopesNotConsented.length !== 0) return;
    (async () => {
      try {
        const { useImplicitFlow, state, url, ...payload } = data;
        const result = await authorize({ ...payload, scopes: scopesConsented });

        const searchParams = new URLSearchParams();
        Object.entries(result).forEach(([key, value]) =>
          searchParams.append(key, value as string),
        );
        if (state) searchParams.append("state", state);
        url[useImplicitFlow ? "hash" : "search"] = searchParams.toString();
        window.location.href = url.toString();
      } catch (e) {
        if (e instanceof AxiosError) {
          setError(e.response?.data.message ?? e.message);
          return;
        }
        setError("unknown error");
      }
    })();
  }, [
    clientData,
    navigate,
    paramsData,
    paramsError,
    scopesConsented,
    scopesNotConsented.length,
    t,
    user,
  ]);

  return {
    error: error ?? paramsError,
    scopesNotConsented,
    consent,
    clientData,
  };
};

export default useAuthorize;
