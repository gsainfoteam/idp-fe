import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "src/api/auth";
import { authorize, getClientInformation } from "src/api/oauth";
import {
  authorizeSchema,
  isConsentRequiredScope,
  isNotConsentRequiredScope,
  Scopes,
} from "src/utils/schema";
import useSWR from "swr";
import { z } from "zod";
import { zx } from "zodix";

export const recentlyLoginKey = "_login_redirected";

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
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string>();
  const [scopesConsented, setScopesConsented] = useState<Scopes>([]);
  const [scopesNotConsented, setScopesNotConsented] = useState<Scopes>([]);

  const consent = (scopes: Scopes) => {
    setScopesConsented((prev) => [...prev, ...scopes]);
    setScopesNotConsented([]);
  };

  useEffect(() => {
    if (!paramsData || !clientData) return;
    const { scopes, ...data } = paramsData;
    if (scopesConsented.length === 0) {
      if (data.prompt === "none") {
        if (!user) return redirect({ error: "login_required" }, data);
        if (!clientData.recentConsent)
          return redirect({ error: "consent_required" }, data);
      }
      if (
        data.prompt === "login" &&
        !sessionStorage.getItem(recentlyLoginKey)
      ) {
        void logout();
        return;
      }
      if (
        data.prompt !== "consent" &&
        data.prompt !== "login" &&
        clientData.recentConsent
      ) {
        setScopesConsented(clientData.recentConsent);
        return;
      }
      setScopesConsented(scopes.filter(isNotConsentRequiredScope));
      setScopesNotConsented(scopes.filter(isConsentRequiredScope));
      return;
    }
    if (scopesNotConsented.length !== 0) return;
    sessionStorage.removeItem(recentlyLoginKey);
    (async () => {
      try {
        const { useImplicitFlow, state, url, ...payload } = data;
        const result = await authorize({ ...payload, scopes: scopesConsented });
        redirect({ ...result, state }, { url, useImplicitFlow });
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
    logout,
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

const redirect = (
  params: Record<string, string>,
  data: {
    useImplicitFlow: boolean;
    url: URL;
  },
) => {
  const searchParams = new URLSearchParams();
  Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .forEach(([key, value]) => searchParams.append(key, value as string));
  const url = new URL(data.url);
  url[data.useImplicitFlow ? "hash" : "search"] = searchParams.toString();
  window.location.href = url.toString();
};

export default useAuthorize;
