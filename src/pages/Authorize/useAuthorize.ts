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
import { authorize } from "src/api/oauth";
import { z } from "zod";
import { zx } from "zodix";

const Scope = z.enum([
  "openid",
  "profile",
  "email",
  "phone",
  "student_id",
  "offline_access",
]);
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
      .pipe(z.array(Scope)),
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
  .refine(({ nonce, useImplicitFlow }) => !useImplicitFlow || !!nonce, {
    message: "nonce is required for implicit flow",
    path: ["nonce"],
  });

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
  const { data, error: paramsError } = useParams();
  const href = useHref(useLocation());
  const { user } = useAuth({
    redirectUrl: {
      pathname: "/login",
      search: new URLSearchParams({ redirect: href }).toString(),
    },
  });
  const navigate = useNavigate();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!user || !data) return;
    (async () => {
      try {
        const { useImplicitFlow, state, url, ...payload } = data;
        const result = await authorize(payload);

        const searchParams = new URLSearchParams();
        Object.entries(result).forEach(([key, value]) =>
          searchParams.append(key, value as string),
        );
        if (state) searchParams.append("state", state);
        if (useImplicitFlow) {
          url.hash = searchParams.toString();
        } else {
          url.search = searchParams.toString();
        }
        window.location.href = url.toString();
      } catch (e) {
        if (e instanceof AxiosError) {
          setError(e.response?.data.message ?? e.message);
          return;
        }
        setError("unknown error");
      }
    })();
  }, [data, navigate, paramsError, t, user]);

  return { error: error ?? paramsError };
};

export default useAuthorize;
