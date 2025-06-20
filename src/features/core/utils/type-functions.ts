export type NullishToUnknown<T> =
  NonNullable<T> extends never ? unknown : NonNullable<T>;

export type Pretty<T> = {
  [K in keyof T]: T[K];
} & {};

export type RequireKeys<T, K extends keyof T> = Pretty<
  Omit<T, K> & Required<Pick<T, K>>
>;

export type RemovePartialKeys<T> = Pretty<
  Pick<
    T,
    { [K in keyof T]: T[K] extends NonNullable<T[K]> ? K : never }[keyof T]
  >
>;

export type Difference<A, B> = Pretty<{
  [K in Exclude<keyof A, keyof B>]: A[K];
}>;

export type DifferenceNonNullable<A, B> = Difference<
  RemovePartialKeys<A>,
  RemovePartialKeys<B>
>;

export type Falsy<T> = T | false | 0 | '' | null | undefined;
