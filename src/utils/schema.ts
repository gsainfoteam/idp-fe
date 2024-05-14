import { z } from "zod";

export const Scope = z.enum([
  "openid",
  "offline_access",
  "profile",
  "email",
  "phone",
  "student_id",
]);
export type Scopes = z.infer<typeof Scope>[];
const ScopeRequireConsent = Scope.exclude(["openid", "offline_access"]);
export const isConsentRequiredScope = (scope: string) =>
  ScopeRequireConsent.safeParse(scope).success;
export const isNotConsentRequiredScope = (scope: string) =>
  !isConsentRequiredScope(scope);
const ResponseType = z.enum(["token", "id_token", "code"]);
const responseTypesForImplicitFlow = ["token", "id_token"] as const;
export const authorizeSchema = z
  .object({
    client_id: z.string(),
    redirect_uri: z.string().url(),
    state: z.string().optional(),
    scope: z
      .string()
      .transform((scope) => scope.split(" "))
      .pipe(z.array(Scope))
      .superRefine((scopes, ctx) => {
        if (!scopes.includes("openid")) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "openid scope is required",
            fatal: true,
          });
          return z.NEVER;
        }
      }),
    nonce: z.string().optional(),
    response_type: z
      .string()
      .transform((responseType) => responseType.split(" "))
      .pipe(z.array(ResponseType)),
    prompt: z.enum(["none", "login", "consent"]).optional(),
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
      !scopes.includes("offline_access") ||
      prompt === "consent" ||
      prompt === "login",
    {
      message: "offline_access scope requires consent or login prompt",
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
