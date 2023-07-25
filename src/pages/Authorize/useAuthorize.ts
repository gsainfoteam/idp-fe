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
import useSWR from "swr";
import { z } from "zod";
import { zx } from "zodix";

const Scope = z.enum([
  "openid",
  "offline_access",
  "profile",
  "email",
  "phone",
  "student_id",
]);
const ScopeRequireConsent = Scope.exclude(["openid", "offline_access"]);
const ResponseType = z.enum(["token", "id_token", "code"]);
const responseTypesForImplicitFlow = ["token", "id_token"] as const;
const paramSchema = z
  .object({
    client_id: z.string(),
    redirect_uri: z.string().url(),
    state: z.string().optional(),
    scope: z
      .string()
      .transform((scope) => scope.split(" "))
      .pipe(z.array(Scope))
      .refine((scopes) => scopes.includes("openid"), {
        message: "openid scope is required",
      }),
    nonce: z.string().optional(),
    response_type: z
      .string()
      .transform((responseType) => responseType.split(" "))
      .pipe(z.array(ResponseType)),
    prompt: z.enum(["login", "consent"]).default("login"),
  })
  .transform(({ scope, client_id, redirect_uri, response_type, ...rest }) => ({
    scopes: scope,
    clientId: client_id,
    redirectUri: redirect_uri,
    responseTypes: response_type,
    url: new URL(redirect_uri),
    useImplicitFlow: responseTypesForImplicitFlow.some((type) =>
      response_type.includes(type),
    ),
    ...rest,
  }))
  .refine(
    ({ scopes, prompt }) =>
      !scopes.includes("offline_access") || prompt === "consent",
    {
      message: "offline_access scope requires consent prompt",
      path: ["prompt"],
    },
  )
  .refine(
    ({ scopes, responseTypes }) =>
      !scopes.includes("offline_access") || responseTypes.includes("code"),
    {
      message: "offline_access scope requires code response type",
      path: ["response_type"],
    },
  )
  .refine(
    ({ nonce, responseTypes }) => !responseTypes.includes("id_token") || nonce,
    {
      message: "nonce is required for id_token response type",
      path: ["nonce"],
    },
  )
  .refine(
    ({ nonce, responseTypes }) => responseTypes.includes("id_token") || !nonce,
    {
      message: "nonce is not required for non-id_token response type",
      path: ["nonce"],
    },
  );
const useParams = () => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<z.infer<typeof paramSchema>>();
  const [error, setError] = useState<string>();
  useEffect(() => {
    const result = zx.parseQuerySafe(searchParams, paramSchema);
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
      setScopesConsented(
        scopes.filter((scope) => !ScopeRequireConsent.safeParse(scope).success),
      );
      setScopesNotConsented(
        scopes.filter((scope) => ScopeRequireConsent.safeParse(scope).success),
      );
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
