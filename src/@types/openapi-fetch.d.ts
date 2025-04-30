type MergedOptions = {
  baseUrl: string;
  parseAs: ParseAs;
  querySerializer: QuerySerializer<T>;
  bodySerializer: BodySerializer<T>;
  fetch: typeof globalThis.fetch;
  retry?: boolean;
};

type MiddlewareCallbackParams = {
  /** Current Request object */
  request: Request;
  /** The original OpenAPI schema path (including curly braces) */
  readonly schemaPath: string;
  /** OpenAPI parameters as provided from openapi-fetch */
  readonly params: {
    query?: Record<string, unknown>;
    header?: Record<string, unknown>;
    path?: Record<string, unknown>;
    cookie?: Record<string, unknown>;
  };
  /** Unique ID for this request */
  readonly id: string;
  /** createClient options (read-only) */
  readonly options: MergedOptions;
};

type MiddlewareOnRequest = (
  options: MiddlewareCallbackParams,
) =>
  | void
  | Request
  | Response
  | undefined
  | Promise<Request | Response | undefined | void>;
type MiddlewareOnResponse = (
  options: MiddlewareCallbackParams & { response: Response },
) => void | Response | undefined | Promise<Response | undefined | void>;
type MiddlewareOnError = (
  options: MiddlewareCallbackParams & { error: unknown },
) => void | Response | Error | Promise<void | Response | Error>;

export type Middleware = {
  onRequest?: MiddlewareOnRequest;
  onResponse?: MiddlewareOnResponse;
  onError?: MiddlewareOnError;
};
