import { Middleware, QueryHook, SuspenseQueryHook } from 'react-query-kit';

// import { Middleware, QueryHook, SuspenseQueryHook } from 'react-query-kit';
//
// type MiddlewareEnabledGetter = (enabled: boolean) => Middleware<QueryHook>;
//
// export const getMiddlewareEnabled: MiddlewareEnabledGetter = (enabled: boolean) => {
//   const queryMiddleware: Middleware<QueryHook> = (useQueryNext) => {
//     return (options) => {
//       return useQueryNext({
//         ...options,
//         enabled,
//       });
//     };
//   };
//
//   return queryMiddleware;
// };
//
// export const globalQueryMiddleware: Middleware<SuspenseQueryHook> = (useQueryNext) => {
//   return (options) => {
//     return useQueryNext({
//       ...options,
//       enabled: false,
//     });
//   };
// };

export const middlewareEnabled: Middleware<QueryHook<unknown, { id: number }, Error>> = (
  useQueryNext,
) => {
  return (options) => {
    return useQueryNext({ ...options, enabled: (options.variables?.id ?? 0) > 0 });
  };
};

// export const suspenseMiddlewareEnabled: Middleware<SuspenseQueryHook<unknown, number, Error>> = (
//   useQueryNext,
// ) => {
//   return (options) => {
//     return useQueryNext({ ...options, enabled: options.variables ?? 0 > 0 });
//   };
// };
